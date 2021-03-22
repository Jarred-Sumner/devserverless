package installer

import (
	"context"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"

	"github.com/gammazero/workerpool"
	"github.com/jarred-sumner/devserverless/resolver/internal/installer/copier"
	"github.com/jarred-sumner/devserverless/resolver/internal/installer/fetcher"
	"github.com/jarred-sumner/devserverless/resolver/internal/job"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
)

/*ENUM(
FetchQueued
Fetching
CopyQueued
Copying
)
*/
type InstallPackageStep byte

/*ENUM(
Success
Fail
Waiting
InProgress
Skip
)
*/
type InstallPackageStatus byte

/*ENUM(
Waiting
FailHTTPError404
FailHTTPError4xx
FailHTTPError5xx
FailHTTPError
FailExtractionError
FailPermissionError
SuccessAlreadyExists
SuccessComplete
)
*/
type InstallPackageStatusReason byte

type InstallPackageJob struct {
	Manifest *lockfile.JavascriptPackageManifestPartial
	// Parent          *lockfile.JavascriptPackageManifestPartial
	DestinationPath string
	TempPath        string
	SourcePath      string

	Step         InstallPackageStep
	Status       InstallPackageStatus
	StatusReason InstallPackageStatusReason

	FetchChan chan error
	CopyChan  chan error

	Error error

	Fetcher *fetcher.PackageArchiveJob
	Copier  *copier.CopyJob
}

type PackageInstaller struct {
	Jobs []InstallPackageJob

	NodeModulesFolder string
	CacheFolder       string
	TempFolder        string
	Keys              *lockfile.PackageKeysMap

	Ctx *context.Context

	DownloadWorkers *workerpool.WorkerPool
	CopyWorkers     *workerpool.WorkerPool
	Waiter          *sync.WaitGroup
}

func NewPackageInstaller(BaseFolder string, cacheFolder string, ctx *context.Context, waiter *sync.WaitGroup) (PackageInstaller, error) {
	TempFolder, err := ioutil.TempDir(os.TempDir(), "duckpkgs")

	installer := PackageInstaller{
		Jobs:              make([]InstallPackageJob, 0, 100),
		TempFolder:        TempFolder,
		NodeModulesFolder: filepath.Join(BaseFolder, "node_modules"),
		CacheFolder:       cacheFolder,
		Keys:              &lockfile.PackageKeysMap{},
		Ctx:               ctx,
		Waiter:            waiter,
		DownloadWorkers:   workerpool.New(10),
		CopyWorkers:       workerpool.New(10),
	}

	os.MkdirAll(installer.NodeModulesFolder, 0700)

	if err != nil {
		return installer, err
	}

	return installer, err
}

func (i *PackageInstaller) Enqueue(manifest *lockfile.JavascriptPackageManifestPartial) {
	key := lockfile.NewPackageManifestKey(manifest.Name, manifest.Version.Build)
	if _, exists := i.Keys.Load(key); exists {
		return
	}
	i.Keys.Store(key, true)
	i.enqueue(manifest, key)
}

func (i *PackageInstaller) DestinationPathForManifest(manifest *lockfile.JavascriptPackageManifestPartial) string {
	return filepath.Join(i.NodeModulesFolder, manifest.Name)
}

func (i *PackageInstaller) SourcePathForManifest(key string) string {
	return filepath.Join(i.CacheFolder, key)
}

func (i *PackageInstaller) TempPathForManifest(key string) string {
	return filepath.Join(i.TempFolder, key)
}

func (i *PackageInstaller) IsPackageSourced(sourcePath string) bool {
	_, e := os.Stat(sourcePath)
	return !os.IsNotExist(e)
}

func (i *PackageInstaller) enqueueInstall(job *InstallPackageJob) {
	i.Waiter.Add(1)
	job.Copier = &copier.CopyJob{}
	i.CopyWorkers.Submit(func() {
		job := job
		job.CopyChan <- job.Copier.Run(job.TempPath, job.SourcePath, job.DestinationPath)
	})
	err := <-job.CopyChan
	job.Error = err
	close(job.CopyChan)
	if err != nil {
		job.Status = InstallPackageStatusFail
	} else {
		job.Status = InstallPackageStatusSuccess
	}
	i.Waiter.Done()
}
func (i *PackageInstaller) enqueueFetch(installer *InstallPackageJob) {
	i.Waiter.Add(1)
	installer.Fetcher = &fetcher.PackageArchiveJob{
		Input:  fetcher.NewPackageArchive(installer.Manifest, installer.TempPath),
		Status: job.StatusQueued,
		Error:  nil,
		Ctx:    i.Ctx,
	}

	i.DownloadWorkers.Submit(func() {
		installer := installer
		installer.FetchChan <- installer.Fetcher.Run()
	})
	err := <-installer.FetchChan
	installer.Error = err
	close(installer.FetchChan)

	if err != nil {
		installer.Status = InstallPackageStatusFail
		i.Waiter.Done()
		return
	}
	if installer.CopyChan == nil {
		installer.CopyChan = make(chan error)
	}
	i.enqueueInstall(installer)
	i.Waiter.Done()

}

type PackageInstallerBox struct {
	Installer *PackageInstaller
}

func (b PackageInstallerBox) Enqueue(manifest *lockfile.JavascriptPackageManifestPartial) {
	b.Installer.Enqueue(manifest)
}

func (i *PackageInstaller) enqueue(manifest *lockfile.JavascriptPackageManifestPartial, key string) {
	sourcePath := i.SourcePathForManifest(key)
	destinationPath := i.DestinationPathForManifest(manifest)
	installJob := InstallPackageJob{
		Manifest:        manifest,
		DestinationPath: destinationPath,
		TempPath:        "",
		SourcePath:      sourcePath,
		Step:            InstallPackageStepFetchQueued,
		Status:          InstallPackageStatusWaiting,
		StatusReason:    InstallPackageStatusReasonWaiting,
	}

	// 1. Determine what step is necessary.
	//    If it exists in the foler cache, then we don't need to download it.
	if i.IsPackageSourced(sourcePath) {
		installJob.Step = InstallPackageStepCopyQueued
		installJob.CopyChan = make(chan error)
		i.Jobs = append(i.Jobs, installJob)
		// i.Waiter.Add(1)
		go i.enqueueInstall(&installJob)
	} else {
		installJob.TempPath = i.TempPathForManifest(key)
		installJob.FetchChan = make(chan error)
		i.Jobs = append(i.Jobs, installJob)
		// i.Waiter.Add(1)
		go i.enqueueFetch(&installJob)
	}

}
