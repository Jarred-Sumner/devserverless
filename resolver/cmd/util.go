package cmd

import "github.com/tidwall/pretty"

func formatJSON(json []byte) []byte {
	return pretty.Pretty(json)
}
