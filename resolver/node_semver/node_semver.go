//go:generate go-enum -f=$GOFILE --marshal
package node_semver

import (
	"sort"
	"strconv"
	"strings"
	"sync"
)

type WildcardType byte

const (
	NoneWildcard  WildcardType = iota
	MajorWildcard WildcardType = 1
	MinorWildcard WildcardType = 2
	PatchWildcard WildcardType = 3
)

type comparator func(Version, Version) bool

var (
	compEQ comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) == 0
	}
	compNE comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) != 0
	}
	compGT comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) == 1
	}
	compGE comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) >= 0
	}
	compLT comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) == -1
	}
	compLE comparator = func(v1 Version, v2 Version) bool {
		return v1.Compare(v2) <= 0
	}
)

type versionRange struct {
	v Version
	c comparator
}

type Version struct {
	Major uint64
	Minor uint64
	Patch uint64
	Pre   []string
	Build []string
}

// Version to string
func (v Version) String() string {
	b := make([]byte, 0, 5)
	b = strconv.AppendUint(b, v.Major, 10)
	b = append(b, '.')
	b = strconv.AppendUint(b, v.Minor, 10)
	b = append(b, '.')
	b = strconv.AppendUint(b, v.Patch, 10)

	if len(v.Pre) > 0 {
		b = append(b, '-')
		b = append(b, v.Pre[0]...)

		for _, pre := range v.Pre[1:] {
			b = append(b, '.')
			b = append(b, pre...)
		}
	}

	if len(v.Build) > 0 {
		b = append(b, '+')
		b = append(b, v.Build[0]...)

		for _, build := range v.Build[1:] {
			b = append(b, '.')
			b = append(b, build...)
		}
	}

	return string(b)
}

func (v *Version) Reset() {
	v.Major = 0
	v.Minor = 0
	v.Patch = 0
	v.Build = nil
	v.Pre = nil
}

func (v *Version) CopyTo(other *Version) {
	other.Major = v.Major
	other.Minor = v.Minor
	other.Patch = v.Patch
	other.Build = v.Build
	other.Pre = v.Pre
}

func (vv Version) ToRange(comp comparator) Range {
	return Range(func(v Version) bool {
		return comp(v, vv)
	})
}

func (vv *Version) ToWildcardRange(wildcard WildcardType) Range {
	switch wildcard {
	case MajorWildcard:
		{
			vv.Reset()
			return vv.ToRange(compGE)
		}
	case MinorWildcard:
		{
			v := Version{
				Major: vv.Major + 1,
			}

			vv.Reset()
			vv.Major = v.Major - 1
			return v.ToRange(compLT).AND(vv.ToRange(compGE))
		}

	case PatchWildcard:
		{
			v := Version{
				Major: vv.Major,
				Minor: vv.Minor + 1,
			}
			vv.Build = nil
			vv.Pre = nil
			return v.ToRange(compLT).AND(vv.ToRange(compGE))
		}

	default:
		{
			return vv.ToRange(compEQ)
		}
	}

}

func (v *Version) IsEmpty() bool {
	return v.Build == nil && v.Major == 0 && v.Minor == 0 && v.Patch == 0 && v.Pre == nil
}

// Equals checks if v is equal to o.
func (v Version) Equals(o Version) bool {
	return (v.Compare(o) == 0)
}

// EQ checks if v is equal to o.
func (v Version) EQ(o Version) bool {
	return (v.Compare(o) == 0)
}

// NE checks if v is not equal to o.
func (v Version) NE(o Version) bool {
	return (v.Compare(o) != 0)
}

// GT checks if v is greater than o.
func (v Version) GT(o Version) bool {
	return (v.Compare(o) == 1)
}

// GTE checks if v is greater than or equal to o.
func (v Version) GTE(o Version) bool {
	return (v.Compare(o) >= 0)
}

// GE checks if v is greater than or equal to o.
func (v Version) GE(o Version) bool {
	return (v.Compare(o) >= 0)
}

// LT checks if v is less than o.
func (v Version) LT(o Version) bool {
	return (v.Compare(o) == -1)
}

// LTE checks if v is less than or equal to o.
func (v Version) LTE(o Version) bool {
	return (v.Compare(o) <= 0)
}

// LE checks if v is less than or equal to o.
func (v Version) LE(o Version) bool {
	return (v.Compare(o) <= 0)
}

// Compare compares Versions v to o:
// -1 == v is less than o
// 0 == v is equal to o
// 1 == v is greater than o
func (v Version) Compare(o Version) int {
	if v.Major != o.Major {
		if v.Major > o.Major {
			return 1
		}
		return -1
	}
	if v.Minor != o.Minor {
		if v.Minor > o.Minor {
			return 1
		}
		return -1
	}
	if v.Patch != o.Patch {
		if v.Patch > o.Patch {
			return 1
		}
		return -1
	}

	// Quick comparison if a version has no prerelease versions
	if len(v.Pre) == 0 && len(o.Pre) == 0 {
		return 0
	} else if len(v.Pre) == 0 && len(o.Pre) > 0 {
		return 1
	} else if len(v.Pre) > 0 && len(o.Pre) == 0 {
		return -1
	}

	i := 0
	for ; i < len(v.Pre) && i < len(o.Pre); i++ {
		if comp := strings.Compare(v.Pre[i], o.Pre[i]); comp == 0 {
			continue
		} else if comp == 1 {
			return 1
		} else {
			return -1
		}
	}

	// If all pr versions are the equal but one has further prversion, this one greater
	if i == len(v.Pre) && i == len(o.Pre) {
		return 0
	} else if i == len(v.Pre) && i < len(o.Pre) {
		return -1
	} else {
		return 1
	}

}

// rangeFunc creates a Range from the given versionRange.
func (vr *versionRange) rangeFunc() Range {
	return Range(func(v Version) bool {
		return vr.c(v, vr.v)
	})
}

type Range func(Version) bool

// OR combines the existing Range with another Range using logical OR.
func (rf Range) OR(f Range) Range {
	return Range(func(v Version) bool {
		return rf(v) || f(v)
	})
}

// AND combines the existing Range with another Range using logical AND.
func (rf Range) AND(f Range) Range {
	return Range(func(v Version) bool {
		return rf(v) && f(v)
	})
}

/*ENUM(
	Major
	Minor
	Patch
	Prerelease
	Prepatch
	Preminor
	Premajor
)*/
type VersionLevel byte

func (v *Version) IncrementBy(level VersionLevel, dest *Version) {
	switch level {
	case VersionLevelMajor:
		{
			dest.Major = v.Major + 1
			dest.Minor = 0
			dest.Patch = 0
			if len(dest.Build) > 0 {
				dest.Build = nil
			}
		}
	case VersionLevelMinor:
		{
			dest.Major = v.Major
			dest.Minor = v.Minor + 1
			dest.Patch = 0
			if len(dest.Build) > 0 {
				dest.Build = nil
			}
		}
	case VersionLevelPatch:
		{
			dest.Major = v.Major
			dest.Minor = v.Minor
			dest.Patch = v.Patch + 1
			if len(dest.Build) > 0 {
				dest.Build = nil
			}
		}
	case VersionLevelPrerelease:
		{
			dest.Major = v.Major
			dest.Minor = v.Minor
			dest.Patch = v.Patch
		}
	}
}

/*ENUM(
None
Version
Range
)*/
type TokenizeResultValue byte

type TokenizeResult struct {
	Version *Version
	Range   Range
	Value   TokenizeResultValue
}

func (t *TokenizeResult) IsVersion() bool {
	return t.Value == TokenizeResultValueVersion
}

func (t *TokenizeResult) IsRange() bool {
	return t.Value == TokenizeResultValueRange
}

var scratchVersionPool = sync.Pool{
	New: func() interface{} {
		v := Version{}
		return &v
	},
}

func buildRangeFunc(comp comparator, major uint64, minor uint64, patch uint64) Range {
	vv := Version{Major: major, Minor: minor, Patch: patch}
	return Range(func(v Version) bool {
		return comp(v, vv)
	})
}

var preparsedTable = map[string]TokenizeResult{
	"*":  TokenizeResult{Range: buildRangeFunc(compGE, 0, 0, 0), Value: TokenizeResultValueRange},
	"X":  TokenizeResult{Range: buildRangeFunc(compGE, 0, 0, 0), Value: TokenizeResultValueRange},
	"x":  TokenizeResult{Range: buildRangeFunc(compGE, 0, 0, 0), Value: TokenizeResultValueRange},
	"0":  TokenizeResult{Range: buildRangeFunc(compGE, 0, 0, 0).AND(buildRangeFunc(compLT, 1, 0, 0)), Value: TokenizeResultValueRange},
	"1":  TokenizeResult{Range: buildRangeFunc(compGE, 1, 0, 0).AND(buildRangeFunc(compLT, 2, 0, 0)), Value: TokenizeResultValueRange},
	"2":  TokenizeResult{Range: buildRangeFunc(compGE, 2, 0, 0).AND(buildRangeFunc(compLT, 3, 0, 0)), Value: TokenizeResultValueRange},
	"3":  TokenizeResult{Range: buildRangeFunc(compGE, 3, 0, 0).AND(buildRangeFunc(compLT, 4, 0, 0)), Value: TokenizeResultValueRange},
	"4":  TokenizeResult{Range: buildRangeFunc(compGE, 4, 0, 0).AND(buildRangeFunc(compLT, 5, 0, 0)), Value: TokenizeResultValueRange},
	"5":  TokenizeResult{Range: buildRangeFunc(compGE, 5, 0, 0).AND(buildRangeFunc(compLT, 6, 0, 0)), Value: TokenizeResultValueRange},
	"6":  TokenizeResult{Range: buildRangeFunc(compGE, 6, 0, 0).AND(buildRangeFunc(compLT, 7, 0, 0)), Value: TokenizeResultValueRange},
	"7":  TokenizeResult{Range: buildRangeFunc(compGE, 7, 0, 0).AND(buildRangeFunc(compLT, 8, 0, 0)), Value: TokenizeResultValueRange},
	"8":  TokenizeResult{Range: buildRangeFunc(compGE, 8, 0, 0).AND(buildRangeFunc(compLT, 9, 0, 0)), Value: TokenizeResultValueRange},
	"9":  TokenizeResult{Range: buildRangeFunc(compGE, 9, 0, 0).AND(buildRangeFunc(compLT, 10, 0, 0)), Value: TokenizeResultValueRange},
	"10": TokenizeResult{Range: buildRangeFunc(compGE, 10, 0, 0).AND(buildRangeFunc(compLT, 11, 0, 0)), Value: TokenizeResultValueRange},
	"":   TokenizeResult{Range: buildRangeFunc(compGE, 0, 0, 0), Value: TokenizeResultValueRange},
}

func (result *TokenizeResult) AppendVersion(v *Version) {
	switch result.Value {
	case TokenizeResultValueNone:
		{
			result.Version = v
			result.Value = TokenizeResultValueVersion
		}
	case TokenizeResultValueRange:
		{
			result.Range = result.Range.OR(v.ToRange(compEQ))
			result.Value = TokenizeResultValueRange
		}
	case TokenizeResultValueVersion:
		{
			result.Range = result.Version.ToRange(compEQ).OR(v.ToRange(compEQ))
			result.Value = TokenizeResultValueRange
		}
	}
}

func (result *TokenizeResult) AppendRange(r Range) {
	switch result.Value {
	case TokenizeResultValueNone:
		{
			result.Range = r
		}
	case TokenizeResultValueVersion:
		{
			result.Range = result.Version.ToRange(compEQ).AND(r)
			result.Version = nil
		}
	case TokenizeResultValueRange:
		{
			result.Range = result.Range.AND(r)
		}
	}

	result.Value = TokenizeResultValueRange
}

func (result *TokenizeResult) AppendORRange(r Range) {
	switch result.Value {
	case TokenizeResultValueNone:
		{
			result.Range = r
		}
	case TokenizeResultValueVersion:
		{
			result.Range = result.Version.ToRange(compEQ).OR(r)
			result.Version = nil
		}
	case TokenizeResultValueRange:
		{
			result.Range = result.Range.OR(r)
		}
	}

	result.Value = TokenizeResultValueRange
}

func (result *TokenizeResult) AppendWildcard(wildcard WildcardType, v *Version) {
	if wildcard == NoneWildcard {
		result.AppendVersion(v)
		return
	}

	switch result.Value {
	case TokenizeResultValueNone:
		{
			result.Range = v.ToWildcardRange(wildcard)
		}
	case TokenizeResultValueVersion:
		{
			result.Range = result.Version.ToRange(compEQ).AND(v.ToWildcardRange(wildcard))
			result.Version = nil
		}
	case TokenizeResultValueRange:
		{
			result.Range = result.Range.AND(v.ToWildcardRange(wildcard))
		}
	}

	result.Value = TokenizeResultValueRange
}

/*ENUM(
	None
	OR
	GT
	GE
	LT
	LE
	Version
	Tilda
	Caret
)
*/
type sevmerTokenType byte

type semverToken struct {
	Token    sevmerTokenType
	Wildcard WildcardType
}

func (t *semverToken) ToRange(v *Version) Range {
	switch t.Token {
	// Allows changes that do not modify the left-most non-zero element in the [major, minor, patch] tuple. In other words, this allows patch and minor updates for versions 1.0.0 and above, patch updates for versions 0.X >=0.1.0, and no updates for versions 0.0.X.
	case SevmerTokenTypeCaret:
		{
			if v.Major == 0 {
				return v.ToWildcardRange(MajorWildcard)
			} else if v.Minor == 0 {
				return v.ToWildcardRange(MinorWildcard)
			} else {
				r1 := v.ToRange(compGE)
				v2 := &Version{}
				v.CopyTo(v2)
				v2.Minor++
				v2.Patch = 0
				return r1.AND(v2.ToRange(compLT))
			}

		}

	case SevmerTokenTypeTilda:
		{
			if v.Minor == 0 || t.Wildcard == MinorWildcard || t.Wildcard == MajorWildcard {
				return v.ToWildcardRange(MinorWildcard)
			} else {
				return v.ToWildcardRange(PatchWildcard)
			}
		}

	case SevmerTokenTypeGE:
		{
			return v.ToRange(compGE)
		}

	case SevmerTokenTypeLE:
		{
			return v.ToRange(compLE)
		}

	case SevmerTokenTypeGT:
		{
			return v.ToRange(compGT)
		}
	case SevmerTokenTypeLT:
		{
			return v.ToRange(compLT)
		}
	}

	return v.ToWildcardRange(t.Wildcard)
}

func Tokenize(input string) TokenizeResult {
	if preparsedRange, hasPreparsedRange := preparsedTable[input]; hasPreparsedRange {
		return preparsedRange
	}

	i := 0
	length := len(input)
	lastNonwhitespace := -1
	version := scratchVersionPool.Get().(*Version)
	version.Reset()
	result := TokenizeResult{
		Version: nil,
		Range:   nil,
	}

	var token = semverToken{
		Token:    SevmerTokenTypeNone,
		Wildcard: NoneWildcard,
	}
	isOR := false
	count := 0
	wipToken := SevmerTokenTypeNone

	for i < length {
		switch input[i] {
		case '>':
			{
				if token.Token == SevmerTokenTypeVersion {
					isOR = false
				}

				if input[i+1] == '=' {
					wipToken = SevmerTokenTypeGE
					i++
				} else {
					wipToken = SevmerTokenTypeGT
				}

				i++
				for i < length && input[i] == ' ' {
					i++
				}
			}
		case '<':
			{
				if input[i+1] == '=' {
					wipToken = SevmerTokenTypeGE
					i++
				} else {
					wipToken = SevmerTokenTypeLT
				}

				i++
				for i < length && input[i] == ' ' {
					i++
				}
			}
		case '=', 'v':
			{
				wipToken = SevmerTokenTypeVersion
				isOR = true
				i++
				for i < length && input[i] == ' ' {
					i++
				}
			}

		case '~':
			{
				wipToken = SevmerTokenTypeTilda
				i++
				for i < length && input[i] == ' ' {
					i++
				}
			}
		case '^':
			{
				wipToken = SevmerTokenTypeCaret
				i++
				for i < length && input[i] == ' ' {
					i++
				}

			}
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'x', '*':
			{
				wipToken = SevmerTokenTypeVersion
				isOR = true
			}
		case '|':
			{
				i++
				for i < length && input[i] != '|' {
					i++
				}

				for i < length && input[i] != ' ' {
					i++
				}
				isOR = true
				wipToken = SevmerTokenTypeNone
				continue
			}
		case '-':
			{
				i++
				for i < length && input[i] == ' ' {
					i++
				}

			}
		case ' ':
			{
				i++
				for i < length && input[i] == ' ' {
					i++
				}
				continue
			}
		default:
			{
				i++
				wipToken = SevmerTokenTypeNone
				continue
			}
		}

		lastNonwhitespace = i

		if count == 0 && wipToken == SevmerTokenTypeVersion {
			v := &Version{}
			version.Reset()
			token.Token = wipToken
			token.Wildcard, _, i = parseVersion(input[i:], version)
			version.CopyTo(v)
			if token.Wildcard == NoneWildcard {
				result.AppendVersion(v)
			} else {
				result.AppendRange(token.ToRange(v))
			}
			count++
			token.Token = SevmerTokenTypeNone
			token.Wildcard = NoneWildcard
			version.Reset()
		} else if count == 0 {
			v := &Version{}
			version.Reset()
			token.Token = wipToken
			token.Wildcard, _, i = parseVersion(input[i:], version)
			version.CopyTo(v)
			result.AppendRange(token.ToRange(v))
			token.Token = wipToken
			version.Reset()
			count++
		} else if isOR {

			if token.Token != SevmerTokenTypeNone && count > 1 {

				v := &Version{}
				version.CopyTo(v)
				or := token.ToRange(v)

				version.Reset()
				token.Token = wipToken
				token.Wildcard, _, i = parseVersion(input[i:], version)
				v2 := &Version{}
				version.CopyTo(v2)

				result.AppendORRange(or.OR(token.ToRange(v2)))
			} else {
				token.Token = wipToken
				token.Wildcard, _, i = parseVersion(input[i:], version)
				v2 := &Version{}
				version.CopyTo(v2)
				result.AppendORRange(token.ToRange(v2))
			}
			count++
		} else {
			count++
			v := &Version{}
			version.CopyTo(v)
			or := token.ToRange(v)
			version.Reset()
			token.Token = wipToken
			token.Wildcard, _, i = parseVersion(input[i:], version)
			v2 := &Version{}
			version.CopyTo(v2)

			result.AppendRange(or.AND(token.ToRange(v2)))
		}

		i += lastNonwhitespace + 1
		isOR = false
	}

	scratchVersionPool.Put(version)
	return result
}

func parseVersion(vStr string, parts *Version) (_wildcard WildcardType, isValid bool, stoppedAt int) {
	partI := 0
	partStartI := -1
	lastCharI := 0
	isValid = true
	isDone := false
	count := len(vStr)
	if count == 0 {
		return _wildcard, false, 0
	}

	for i, char := range vStr {

		if isDone {
			break
		}
		stoppedAt = i

		switch char {
		case ' ':
			{
				if partI >= 2 {
					isDone = true
					break
				}
			}
		case '|', '^', '#', '&', '%', '!':
			{
				isDone = true
				stoppedAt--
				break
			}
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			{
				if partStartI == -1 {
					partStartI = i
				}
				lastCharI = i
			}

		case '.':
			{
				if partStartI > -1 && partI <= 2 {
					switch partI {
					case 0:
						{
							parts.Major = normalizeVersionPart(vStr[partStartI:i])
						}
					case 1:
						{
							parts.Minor = normalizeVersionPart(vStr[partStartI:i])
						}
					}

					partStartI = -1
					partI++
					// "fo.o.b.ar"
				} else if partI > 2 || partStartI == -1 {
					isValid = false
					isDone = true
					break
				}
			}
		case '-', '+':
			{
				if partI == 2 && partStartI > -1 {
					parts.Patch = normalizeVersionPart(vStr[partStartI:i])

					_wildcard = NoneWildcard
					partStartI = i
					partI = 3
					isDone = true
					break
				} else {
					isValid = false
					isDone = true
					break
				}
			}
		case 'x', '*', 'X':
			{
				if partStartI == -1 {
					partStartI = i
				}
				lastCharI = i
				// We want min wildcard
				if _wildcard == NoneWildcard {
					switch partI {
					case 0:
						{
							_wildcard = MajorWildcard
						}
					case 1:
						{
							_wildcard = MinorWildcard
						}
					case 2:
						{
							_wildcard = PatchWildcard
						}
					}
				}
			}

		default:
			{
				lastCharI = 0
				isValid = false
				isDone = true
				break
			}
		}
	}

	if isValid {
		isValid = partI > -1
	}

	if partStartI == -1 {
		partStartI = 0
	}

	if lastCharI == -1 || partStartI > lastCharI {
		lastCharI = len(vStr) - 1
	}

	// Where did we leave off?
	switch partI {

	// That means they used a match like this:
	// "1"
	// So its a wildcard minor
	case 0:
		{
			if _wildcard == NoneWildcard {
				_wildcard = MinorWildcard
			}

			parts.Major = normalizeVersionPart(vStr[partStartI : lastCharI+1])
		}

	case 3:
		{

			stoppedAt = parseBuild(parts, vStr[partStartI:])
			stoppedAt += partStartI
		}

	case 1:
		{
			if _wildcard == NoneWildcard {
				_wildcard = PatchWildcard
			}

			parts.Minor = normalizeVersionPart(vStr[partStartI : lastCharI+1])
		}

	case 2:
		{
			parts.Patch = normalizeVersionPart(vStr[partStartI : lastCharI+1])
		}
	}

	return _wildcard, isValid, stoppedAt
}

func parseBuild(parts *Version, input string) int {
	if len(input) == 0 {
		return 0
	}

	buildCount := 0
	preCount := 0
	stoppedAt := 0
	for i, char := range input {
		if char == ' ' {
			stoppedAt = i
			break
		} else if char == '-' {
			preCount++
		} else if char == '+' {
			buildCount++
		}
	}

	if buildCount == 0 && preCount == 0 {
		return stoppedAt
	}

	buildSegments := make([]string, 0, buildCount)
	preSegments := make([]string, 0, preCount)

	start := 0
	trailingIsBuild := false
	stoppedAt = 0
	for i, char := range input {
		stoppedAt = i
		if char == ' ' {

			break
		}

		if char == '-' || char == '+' {
			if i > start && trailingIsBuild {
				buildSegments = append(buildSegments, input[start:i+1])
			} else if i > start && !trailingIsBuild {
				preSegments = append(preSegments, input[start:i+1])
			}

			start = i + 1
			trailingIsBuild = char == '+'
		}
	}

	if start > 0 && trailingIsBuild {
		buildSegments = append(buildSegments, input[start:])
	} else if start > 0 && !trailingIsBuild {
		preSegments = append(preSegments, input[start:])
	}
	parts.Build = buildSegments
	parts.Pre = preSegments

	return stoppedAt
}

func normalizeVersionPart(part string) uint64 {
	var b strings.Builder

	// First, we count.
	var count int
	needsNormalization := false

	for _, char := range part {
		switch char {
		case 'x', '*':
			{
				needsNormalization = true
				count++
			}
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			{
				count++
			}

		default:
			{
				needsNormalization = true
			}
		}
	}

	if count == 0 {
		return 0
	} else if !needsNormalization {
		comp, _ := strconv.ParseUint(part, 10, 64)
		return comp
	}

	b.Grow(count)

	for _, char := range part {
		switch char {
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			{
				b.WriteRune(char)
			}
		case '*', 'x':
			{
				b.WriteRune('0')
			}
		}
	}

	comp, _ := strconv.ParseUint(b.String(), 10, 64)
	return comp
}

func NewVersion(input string) (v *Version, e error) {

	return v, e
}

// func IsRange(input string) bool {

// }

// Versions represents multiple versions.
type Versions []Version

// Len returns length of version collection
func (s Versions) Len() int {
	return len(s)
}

// Swap swaps two versions inside the collection by its indices
func (s Versions) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

// Less checks if version at index i is less than version at index j
func (s Versions) Less(i, j int) bool {
	return s[i].LT(s[j])
}

// Sort sorts a slice of versions
func Sort(versions []Version) {
	sort.Sort(Versions(versions))
}
