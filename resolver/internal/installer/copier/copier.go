package copier

import (
	"os"

	"github.com/jarred-sumner/devserverless/resolver/internal/job"
	"github.com/otiai10/copy"
)

type CopyJob struct {
	Status job.Status
}

func (c *CopyJob) Run(sourcePath string, destPath string, copyPath string) error {
	c.Status = job.StatusProgress
	var err error
	if _, e := os.Stat(destPath); os.IsNotExist(e) {
		err = c.doRename(sourcePath, destPath)
	}

	if err == nil {
		err = copy.Copy(destPath, copyPath)
	}

	if err == nil {
		c.Status = job.StatusSuccess
	} else {
		c.Status = job.StatusError
	}

	return err
}

func (c *CopyJob) doRename(sourcePath string, destPath string) error {
	return os.Rename(sourcePath, destPath)
}

func (i *CopyJob) EnsureDestinationFree(sourcePath string) error {
	if _, e := os.Stat(sourcePath); !os.IsNotExist(e) {
		return os.RemoveAll(sourcePath)
	}

	return nil
}
