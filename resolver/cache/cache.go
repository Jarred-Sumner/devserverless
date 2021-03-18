//go:generate go-enum -f=$GOFILE --marshal

package cache

/*ENUM(
	None = 0
	Remote
	Local
)
*/
type CacheType int
