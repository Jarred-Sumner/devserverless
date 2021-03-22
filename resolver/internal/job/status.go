//go:generate go-enum -f=$GOFILE --marshal

package job

/*ENUM(
	Success
	Error
	Queued
	Progress
)
*/
type Status byte
