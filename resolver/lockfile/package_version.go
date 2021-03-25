//go:generate go-enum -f=$GOFILE --marshal

package lockfile

import (
	"strings"
)

/*ENUM(
	Npm
	GithubImplicit
	GithubImplicitBranchless
	GithubHttpsBranchless
	GithubHttps
	GithubGitBranchless
	GithubGit

	Range
)
*/
type PackageVersionType byte

const GitProtocolPrefix = "git://"
const HttpsProtocolPrefix = "https://"
const HttpProtocolPrefix = "http://"

func NewVersionRange(chars string, length int) VersionRange {
	lastValid := -1
	dotCount := 0
	hasWildcard := false
	subtraction := -1

	for i, char := range chars {

		switch char {
		case '+', '-':
			{
				subtraction = i
			}
		case '*', 'x':
			{
				if subtraction == -1 {
					hasWildcard = true
				}
			}
		case ' ':
			{
				if subtraction > -1 {
					return VersionRangeUnknown
				}

				lastValid = i
			}
		case '1', '2', '3', '4', '5', '6', '7', '8', '9', '0':
			{
				lastValid = i
			}

		case '~', '^', '<', '>', '=', '|', '&':
			{
				return VersionRangeRange
			}

		case '.':
			{
				if i == 0 {
					return VersionRangeUnknown
				} else if subtraction == -1 && (dotCount >= 2 || lastValid != i-1) {
					dotCount++
				} else if subtraction > -1 {
					return VersionRangeUnknown
				}
			}
		default:
			{
				if subtraction == -1 {
					return VersionRangeUnknown
				}
			}
		}
	}

	// 2.x, 1.1x, 2
	if hasWildcard || lastValid == 0 && length == 1 || (lastValid > -1 && dotCount == 1 && subtraction == -1) {
		return VersionRangeWildcard
	} else if !hasWildcard && dotCount < 2 && lastValid > -1 {
		return VersionRangeUnknown
	} else if dotCount == 2 && (lastValid == length-1 || subtraction > -1) {
		return VersionRangeExact
	} else {
		return VersionRangeUnknown
	}
}

const githubBareLength = len("github:")
const githubDotComLength = len("github.com")
const httpLength = len("http://")
const httpsLength = len("http://")
const gitLength = len("git://")
const gitSshLength = len("git+ssh://")

// hope this gets inlined!
func isGitHubDotComPrefix(version string, length int) bool {
	return length > githubDotComLength && version[0:githubDotComLength] == "github.com"
}

func isGitHubBarePrefix(version string, length int) bool {
	return length > githubBareLength && version[0:githubBareLength] == "github:"
}

func isHTTPPrefix(version string, length int) bool {
	return length > httpLength && version[0:httpLength] == "http://"
}

func isHTTPSPrefix(version string, length int) bool {
	return length > httpsLength && version[0:httpsLength] == "https://"
}

func isGitProtocol(version string, length int) bool {
	return length > gitLength && version[0:gitLength] == "git://"
}

func isGitSSHProtocol(version string, length int) bool {
	return length > gitSshLength && version[0:gitSshLength] == "git+ssh://"
}

func isGithubOwnerRepo(version string) bool {
	hasSlash := false

	for _, char := range version {
		if (char >= '0' && char <= '9') || char == '-' || char == '_' || (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') {
		} else if char == '/' && !hasSlash {
			hasSlash = true
		} else if char == '/' && hasSlash {
			return false
		} else if char == '#' && hasSlash {
			return true
		} else {
			return false
		}
	}

	return hasSlash
}

func isPathLike(version string) bool {
	return (version[0] == '/' || version[0] == '.')
}

const SLASH_BYTE = byte('/')

func NewPackageVersionProtocol(version string, length int) PackageVersionProtocol {
	// If no /, can't be any fancy protocol
	// If no space, can't be anything complex
	if strings.IndexByte(version, SLASH_BYTE) == -1 || strings.IndexByte(version, SPACE_BYTE) > -1 {
		return PackageVersionProtocolDefault
		// github:Jarred-Sumner/git-peek
	} else if isGitHubBarePrefix(version, length) {
		return PackageVersionProtocolGithubBare
		// github.com/Jarred-Sumner/git-peek
	} else if isGitHubDotComPrefix(version, length) {
		if strings.Index(version, "/tarball") > -1 {
			return PackageVersionProtocolGithubTarball
		} else {
			return PackageVersionProtocolGithubDotCom
		}
		// https://bitbucket.com/Jarred-Sumner/git-peek
	} else if isHTTPPrefix(version, length) {
		// https://bitbucket.com/Jarred-Sumner/git-peek.tgz
		if strings.Index(version, ".tgz") > -1 {
			return PackageVersionProtocolHttpTarball
		} else {
			// https://bitbucket.com/Jarred-Sumner/git-peek
			return PackageVersionProtocolHttp
		}
		// https://github.com/Jarred-Sumner/git-peek
	} else if isHTTPSPrefix(version, length) {
		// https://github.com/Jarred-Sumner/git-peek
		if isGitHubDotComPrefix(version[httpsLength:], length-httpsLength) {
			// https://github.com/Jarred-Sumner/git-peek/tarballs/master
			if strings.Index(version, "/tarball") > -1 {
				return PackageVersionProtocolGithubTarball
			} else {
				// https://github.com/Jarred-Sumner/git-peek
				return PackageVersionProtocolGithubDotCom
			}
			// https://bitbucket.com/Jarred-Sumner/git-peek/releases/1.0.0.tgz
		} else if strings.Index(version, ".tgz") > -1 {
			return PackageVersionProtocolHttpsTarball
		} else {
			// https://bitbucket.com/Jarred-Sumner/git-peek
			return PackageVersionProtocolHttps
		}
		// git://git@github.com/Jarred-Sumner/git-peek.git
	} else if isGitProtocol(version, length) {
		return PackageVersionProtocolGit
		// git+ssh://git@github.com/Jarred-Sumner/git-peek.git
	} else if isGitSSHProtocol(version, length) {
		return PackageVersionProtocolGitSsh
		// Jarred-Sumner/git-peek
	} else if isGithubOwnerRepo(version) {
		return PackageVersionProtocolGithubOwnerRepo
		// ../Jarred-Sumner/git-peek
	} else if isPathLike(version) {
		return PackageVersionProtocolPathlike
	} else {
		return PackageVersionProtocolDefault
	}
}

// Examples:
// - https://cdn.jsdelivr.net/gh/Jarred-Sumner/fastbench.dev@main/package.json
// - https://cdn.jsdelivr.net/gh/Jarred-Sumner/fastbench.dev/package.json
const JSDELIVR_GH_BASE_URL = "https://cdn.jsdelivr.net/gh/"
const JSDELIVR_GH_BASE_URL_LENGTH = len(JSDELIVR_GH_BASE_URL)
const PACKAGE_JSON_PATH = "/package.json"
const PACKAGE_JSON_PATH_LENGTH = len(PACKAGE_JSON_PATH)
const MIN_JSDELIVR_URL_LENGTH = PACKAGE_JSON_PATH_LENGTH + JSDELIVR_GH_BASE_URL_LENGTH
const MIN_JSDELIVR_URL_LENGTH_VERSIONED = PACKAGE_JSON_PATH_LENGTH + JSDELIVR_GH_BASE_URL_LENGTH + 1
const SLASH_BLOB_SLASH = "/blob/"
const SLASH_BLOB_SLASH_LENGTH = len(SLASH_BLOB_SLASH)
const SLASH_TREE_SLASH = "/tree/"
const SLASH_TREE_SLASH_LENGTH = len(SLASH_TREE_SLASH)

func extractVersionedGithubPackageJSONLink(ownerRepo string, version string, versionLength int, ownerRepoLength int) string {
	b := strings.Builder{}
	b.Grow(MIN_JSDELIVR_URL_LENGTH_VERSIONED + versionLength + ownerRepoLength)
	b.WriteString(JSDELIVR_GH_BASE_URL)
	b.WriteString(ownerRepo)
	b.WriteString("@")
	b.WriteString(version)
	b.WriteString(PACKAGE_JSON_PATH)

	return b.String()
}

func extractUnversionedGithubPackageJSONLink(ownerRepo string, ownerRepoLength int) string {
	b := strings.Builder{}
	b.Grow(MIN_JSDELIVR_URL_LENGTH + ownerRepoLength)
	b.WriteString(JSDELIVR_GH_BASE_URL)
	b.WriteString(ownerRepo)
	b.WriteString(PACKAGE_JSON_PATH)

	return b.String()
}

func (protocol PackageVersionProtocol) ExtractJSDelivrGithubPackageJSONURL(value string) (string, bool) {

	switch protocol {
	// github:Jarred-Sumner/git-peek
	case PackageVersionProtocolGithubBare:
		{
			tag := protocol.ExtractTag(value)
			tagLength := len(tag)
			if tagLength > 0 {
				hashTagIndex := strings.LastIndexByte(value[githubBareLength:], HASHTAG_BYTE)
				return extractVersionedGithubPackageJSONLink(value[githubBareLength:hashTagIndex], tag, tagLength, hashTagIndex-githubBareLength), true
			} else {
				// TODO: do we need to handle query strings?
				return extractUnversionedGithubPackageJSONLink(value[githubBareLength:], len(value[githubBareLength:])), true
			}
		}
	// Same as above except no prefix
	case PackageVersionProtocolGithubOwnerRepo:
		{
			tag := protocol.ExtractTag(value)
			tagLength := len(tag)
			if tagLength > 0 {
				hashTagIndex := strings.LastIndexByte(value, HASHTAG_BYTE)
				return extractVersionedGithubPackageJSONLink(value[githubBareLength:hashTagIndex], tag, tagLength, hashTagIndex-githubBareLength), true
			} else {
				// TODO: do we need to handle query strings?
				return extractUnversionedGithubPackageJSONLink(value, len(value)), true
			}
		}

	case PackageVersionProtocolGithubTarball, PackageVersionProtocolGithubDotCom:
		{
			tag := protocol.ExtractTag(value)
			tagLength := len(tag)
			totes := len(value)

			if isHTTPSPrefix(value, totes) {
				value = value[(httpsLength + githubDotComLength):]
				totes -= httpsLength + githubDotComLength
			} else {
				value = value[githubDotComLength:]
				totes -= githubDotComLength
			}

			firstSlash := strings.IndexByte(value, SLASH_BYTE) + 1
			secondSlash := firstSlash + strings.IndexByte(value[firstSlash:], SLASH_BYTE)
			ownerRepo := value[firstSlash:secondSlash]
			if tagLength > 0 {
				return extractVersionedGithubPackageJSONLink(ownerRepo, tag, tagLength, secondSlash-firstSlash), true
			} else {
				return extractUnversionedGithubPackageJSONLink(ownerRepo, secondSlash-firstSlash), true
			}
		}
	}

	return value, false
}

const PackageVersionDefaultVersionTag = ""
const HASHTAG_BYTE = byte('#')

func (protocol PackageVersionProtocol) ExtractTag(value string) string {
	switch protocol {
	case PackageVersionProtocolGithubDotCom:
		{
			var githubPath string
			if value[0] == 'h' {
				githubPath = value[httpsLength+githubDotComLength+1:]
			} else {
				githubPath = value[githubDotComLength:]
			}

			firstSlash := strings.IndexByte(githubPath, '/')
			// Root url
			if strings.LastIndexByte(githubPath, '/') == firstSlash {
				return ""
			}

			secondSlash := strings.IndexByte(githubPath[(firstSlash+1):], SLASH_BYTE)

			treePrefix := githubPath[secondSlash : secondSlash+SLASH_BLOB_SLASH_LENGTH]
			// github.com/owner/repo/tree/
			if treePrefix == SLASH_BLOB_SLASH || treePrefix == SLASH_TREE_SLASH {
				remainder := githubPath[secondSlash+SLASH_BLOB_SLASH_LENGTH:]
				nextSlash := strings.IndexByte(remainder, SLASH_BYTE)

				if nextSlash > -1 {
					return remainder[:nextSlash]
				} else {
					return remainder
				}
			}

			return ""
		}
	case PackageVersionProtocolHttp, PackageVersionProtocolHttps, PackageVersionProtocolGit, PackageVersionProtocolGitSsh, PackageVersionProtocolGithubOwnerRepo, PackageVersionProtocolGithubBare:
		{

			start := strings.IndexByte(value, HASHTAG_BYTE)
			if start > -1 {
				return value[start:]
			} else {
				return PackageVersionDefaultVersionTag
			}
		}

	// https://github.com/<username>/<repository>/tarball/<version>
	case PackageVersionProtocolGithubTarball:
		{
			return value[(strings.LastIndexByte(value, SLASH_BYTE) + 1):]
		}
	}

	return value
}

func normalizeVersionString(version string) string {
	return strings.ToLower(strings.TrimSpace(version))
}

const SPACE_BYTE = byte(' ')

func NewVersion(version string, pkg *JavascriptPackageManifestPartial) {
	pkg.Version.OriginalTag = normalizeVersionString(version)
	length := len(pkg.Version.OriginalTag)
	pkg.Version.Protocol = NewPackageVersionProtocol(pkg.Version.OriginalTag, length)
	pkg.Version.Tag = pkg.Version.Protocol.ExtractTag(pkg.Version.OriginalTag)
}
