// +build darwin,cgo
package copier

// #include <sys/clonefile.h>
// #include <stdlib.h>
// #include <errno.h>
//
// int cloneAndFree(char *src, char *dst) {
//   int result = clonefile(src, dst, 0);
//   int err = errno;
//   free(src);
//   free(dst);
//   errno = err;
//   return result;
// }
import "C"

func cloneFile(src, dst string) error {
	result, err := C.cloneAndFree(C.CString(src), C.CString(dst))
	if result != 0 {
		return err
	}
	return nil
}

func doCopy(sourcePath string, destPath string) error {
	// var err error

	return cloneFile(sourcePath, destPath)

	// err = godirwalk.Walk(sourcePath, &godirwalk.Options{
	// 	Callback: func(osPathname string, de *godirwalk.Dirent) error {
	// 		// // Following string operation is not most performant way
	// 		// // of doing this, but common enough to warrant a simple
	// 		// // example here:
	// 		// if strings.Contains(osPathname, ".git") {
	// 		// 	return godirwalk.SkipThis
	// 		// }
	// 		// fmt.Printf("%s %s\n", de.ModeType(), osPathname)
	// 		newPath, err := filepath.Rel(sourcePath, osPathname)
	// 		if err != nil {
	// 			return err
	// 		}
	// 		newPath = filepath.Join(destPath, newPath)
	// 		if de.IsDir() {
	// 			return cloneFile(osPathname, newPath)
	// 		} else if de.IsRegular() {
	// 			return cloneFile(osPathname, newPath)
	// 		}
	// 		return nil
	// 	},
	// 	Unsorted: true, // (optional) set true for faster yet non-deterministic enumeration (see godoc)
	// })
	// return err
}
