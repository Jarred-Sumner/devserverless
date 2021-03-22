package fetcher

import (
	"context"
	"errors"
	"io"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/jarred-sumner/devserverless/resolver/internal/job"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/mholt/archiver/v3"
)

var client *http.Client

type PackageArchive struct {
	Source     string
	Target     string
	SourceType lockfile.PackageProvider
}

type PackageArchiveJob struct {
	Input  PackageArchive
	Status job.Status
	Error  error

	Ctx *context.Context
}

func NewPackageArchive(manifest *lockfile.JavascriptPackageManifestPartial, target string) PackageArchive {
	return PackageArchive{
		Source:     manifest.Provider.ToArchiveURL(manifest.Name, manifest.Version.Build),
		Target:     target,
		SourceType: manifest.Provider,
	}
}

func (p *PackageArchiveJob) Fetch() error {
	switch p.Input.SourceType {
	case lockfile.PackageProviderTgz, lockfile.PackageProviderNpm:
		{
			if client == nil {
				client = &http.Client{}
			}

			return p.fetchTGZ()
		}
	}

	return errors.New("package source is not implemented yet")
}

func (p *PackageArchiveJob) Run() error {
	p.Status = job.StatusProgress
	err := p.Fetch()

	if err != nil {
		p.Status = job.StatusError
		p.Error = err
		return err
	}

	p.Status = job.StatusSuccess
	return err

}

func (p *PackageArchiveJob) fetchTGZ() error {
	request, err := http.NewRequestWithContext(*p.Ctx, "GET", p.Input.Source, nil)

	if err != nil {
		return err
	}

	response, err := client.Do(request)

	if err != nil {
		return err
	}

	tar := archiver.NewTarGz()
	err = tar.Open(response.Body, 0)
	if err != nil {
		return err
	}

	tar.StripComponents = 1
	dest := p.Input.Target

	var name string

	var out string
	var file archiver.File
	for {
		file, err = tar.Read()
		if err == io.EOF {
			err = nil
			break
		}

		name, _ = getFileFullNameFromHeader(file)
		name = filepath.Clean(name)
		leading := strings.IndexRune(name, '/')
		if leading == -1 {
			file.Close()
			continue
		}

		name = name[leading:]
		name = filepath.Clean(name)

		if name == "" || name == "." || name == ".DS_Store" {
			file.Close()
			continue
		}

		out = filepath.Join(dest, name)

		if file.IsDir() {
			err = mkdir(out, file.Mode())
			// if err != nil {
			// 	// peek.Error("Error mkdir at %v", out)
			// 	// hadErrors = true
			// }
		} else {
			err = writeNewFile(out, file.ReadCloser, file.Mode())
			// if err != nil {
			// 	// peek.Error("Error writing %v", out)
			// 	// hadErrors = true
			// }
		}

		// if err != nil {
		// 	if t.ContinueOnError || IsIllegalPathError(err) {
		// 		log.Printf("[ERROR] Reading file in tar archive: %v", err)
		// 		continue
		// 	}
		// 	return fmt.Errorf("reading file in tar archive: %v", err)
		// }
	}

	tar.Close()
	return err
}
