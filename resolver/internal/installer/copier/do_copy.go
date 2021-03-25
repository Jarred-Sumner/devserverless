// +build !darwin

package copier

import (
	"os"
	"path/filepath"

	"github.com/karrick/godirwalk"
)

func doCopy(sourcePath string, destPath string) error {
	var err error
	err = godirwalk.Walk(sourcePath, &godirwalk.Options{
		Callback: func(osPathname string, de *godirwalk.Dirent) error {
			// // Following string operation is not most performant way
			// // of doing this, but common enough to warrant a simple
			// // example here:
			// if strings.Contains(osPathname, ".git") {
			// 	return godirwalk.SkipThis
			// }
			// fmt.Printf("%s %s\n", de.ModeType(), osPathname)
			newPath, err := filepath.Rel(sourcePath, osPathname)
			if err != nil {
				return err
			}
			newPath = filepath.Join(destPath, newPath)
			if de.IsDir() {
				return os.MkdirAll(newPath, 0777)
			} else if de.IsRegular() {
				return os.Link(osPathname, newPath)
			}
			return nil
		},
		Unsorted: true, // (optional) set true for faster yet non-deterministic enumeration (see godoc)
	})
	return err
}
