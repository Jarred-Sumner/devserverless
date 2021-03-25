package node_semver_test

import (
	"fmt"
	"testing"

	"github.com/jarred-sumner/devserverless/resolver/node_semver"
	"github.com/jarred-sumner/devserverless/resolver/node_semver/fixtures"
	"github.com/stretchr/testify/assert"
)

func assertNotRange(t *testing.T, r *node_semver.TokenizeResult, input string) {
	assert.False(t, r.Value == node_semver.TokenizeResultValueRange, fmt.Sprintf("Expected %s to not be a Range", input))
}

func TestMajorOnlyVersion(t *testing.T) {
	result := node_semver.Tokenize("1.0.0")

	assert.NotNil(t, result.Version)
	assert.Equal(t, result.Version.Major, uint64(1))
	assert.Equal(t, result.Version.Minor, uint64(0))
	assert.Equal(t, result.Version.Patch, uint64(0))
	assertNotRange(t, &result, "1.0.0")
}

func TestGTVersion(t *testing.T) {
	result := node_semver.Tokenize(">1.0.0")
	v := node_semver.Version{
		Major: 1,
		Minor: 0,
		Patch: 1,
	}
	assert.True(t, result.Range(v))
	v.Major = 0
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 1
	assert.True(t, result.Range(v))
	v.Major = 1
	v.Minor = 0
	v.Patch = 2
	assert.True(t, result.Range(v))
}

func TestGTLTVersion(t *testing.T) {
	result := node_semver.Tokenize(">=1.0.0 <1.0.9")
	v := node_semver.Version{
		Major: 1,
		Minor: 0,
		Patch: 1,
	}
	assert.True(t, result.Range(v))
	v.Major = 0
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 1
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 0
	v.Patch = 2
	assert.True(t, result.Range(v))
}

func TestMajorMinorVersion(t *testing.T) {
	result := node_semver.Tokenize("1.2.0")

	assert.NotNil(t, result.Version)
	assert.Equal(t, result.Version.Major, uint64(1))
	assert.Equal(t, result.Version.Minor, uint64(2))
	assert.Equal(t, result.Version.Patch, uint64(0))
	assertNotRange(t, &result, "1.2.0")
}

func TestMajorMinorPatchVersion(t *testing.T) {
	result := node_semver.Tokenize("1.2.3")

	assert.NotNil(t, result.Version)
	assert.Equal(t, result.Version.Major, uint64(1))
	assert.Equal(t, result.Version.Minor, uint64(2))
	assert.Equal(t, result.Version.Patch, uint64(3))
	assertNotRange(t, &result, "1.2.3")
}

func TestMultipleVersions(t *testing.T) {
	result := node_semver.Tokenize("1.2.3 1.2.9")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}
	v1 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 9,
	}
	assert.True(t, result.Range(v0))
	assert.True(t, result.Range(v1))
	v1.Major = 2
	assert.False(t, result.Range(v1))
}

func TestMultipleVersionsWithOR(t *testing.T) {
	result := node_semver.Tokenize("1.2.3 || 1.2.9")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}
	v1 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 9,
	}
	assert.True(t, result.Range(v0))
	assert.True(t, result.Range(v1))
}

func TestSimplePre(t *testing.T) {
	result := node_semver.Tokenize("1.2.3-pre")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
		Pre:   []string{"pre"},
	}

	assert.True(t, result.IsVersion())
	assert.True(t, result.Version.EQ(v0))
}

func TestSimpleBuild(t *testing.T) {
	result := node_semver.Tokenize("1.2.3+build")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
		Build: []string{"build"},
	}

	assert.True(t, result.IsVersion())
	assert.True(t, result.Version.EQ(v0))
}

func TestSimplePreBuild(t *testing.T) {
	result := node_semver.Tokenize("1.2.3+build-pre")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
		Build: []string{"build"},
		Pre:   []string{"pre"},
	}

	assert.True(t, result.IsVersion())
	assert.True(t, result.Version.EQ(v0))
}

func TestMultiPreBuild(t *testing.T) {
	result := node_semver.Tokenize("1.2.3+build-pre 1.2.8+build-pre")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
		Build: []string{"build"},
		Pre:   []string{"pre"},
	}

	assert.True(t, result.IsRange())
	assert.True(t, result.Range(v0))
}

func TestWildcardPatch(t *testing.T) {
	result := node_semver.Tokenize("1.2.*")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 8,
	}

	assert.True(t, result.IsRange())
	assert.True(t, result.Range(v0))
	v0.Minor++
	assert.False(t, result.Range(v0))
}

func TestWildcardMinor(t *testing.T) {
	result := node_semver.Tokenize("1.*")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 8,
	}

	assert.True(t, result.IsRange())
	assert.True(t, result.Range(v0))
	v0.Major++
	assert.False(t, result.Range(v0))
	v0.Major--
}

func TestCaretWildcardMinor(t *testing.T) {
	result := node_semver.Tokenize("^1.*")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 8,
	}

	assert.True(t, result.IsRange())
	assert.True(t, result.Range(v0))
	v0.Major++
	assert.False(t, result.Range(v0))
	v0.Major--
}

func TestWildcardMajor(t *testing.T) {
	result := node_semver.Tokenize("*")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 8,
	}

	assert.True(t, result.IsRange())
	assert.True(t, result.Range(v0))
	v0.Major = 0
	assert.True(t, result.Range(v0))
	v0.Minor = 0
	assert.True(t, result.Range(v0))
	v0.Patch = 0
	assert.True(t, result.Range(v0))
}

func TestMultipleVersionsWithORLT(t *testing.T) {
	result := node_semver.Tokenize("<1.2.3 || 1.2.9")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 0,
	}
	v1 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 9,
	}
	assert.True(t, result.Range(v0))
	assert.True(t, result.Range(v1))
}

func TestMultipleVersionsWithORLTFlip(t *testing.T) {
	result := node_semver.Tokenize("1.2.9 || <1.2.3")
	v0 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 0,
	}
	v1 := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 9,
	}
	assert.True(t, result.Range(v0))
	assert.True(t, result.Range(v1))
	v1.Patch = 8
	assert.False(t, result.Range(v1))
}

func TestCaretVersion(t *testing.T) {
	result := node_semver.Tokenize("^1.2.3")

	assert.Nil(t, result.Version)
	v := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}
	assert.True(t, result.Range(v))
	v.Major = 2
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 1
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 2
	v.Patch = 2
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 2
	v.Patch = 4
	assert.True(t, result.Range(v))
	v.Major = 1
	v.Minor = 3
	v.Patch = 0
	assert.False(t, result.Range(v))
}

func TestCaretWithWhitespace(t *testing.T) {
	result := node_semver.Tokenize("^ 1.2.3  ")

	assert.Nil(t, result.Version)
	v := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}
	assert.True(t, result.Range(v))
	v.Major = 2
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 1
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 2
	v.Patch = 2
	assert.False(t, result.Range(v))
	v.Major = 1
	v.Minor = 2
	v.Patch = 4
	assert.True(t, result.Range(v))
	v.Major = 1
	v.Minor = 2
	v.Patch = 8
	assert.True(t, result.Range(v))
	v.Major = 1
	v.Minor = 3
	v.Patch = 0
	assert.False(t, result.Range(v))

	assert.False(t, result.Range(node_semver.Version{}))
}

func TestDoubleWildcardMinor(t *testing.T) {
	result := node_semver.Tokenize("2 || 3")
	v := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}

	assert.False(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.False(t, result.Range(v))
}

func TestMultiWildcardMinor(t *testing.T) {
	result := node_semver.Tokenize("2 || 3 || 4 || 5")
	v := node_semver.Version{
		Major: 1,
		Minor: 2,
		Patch: 3,
	}

	assert.False(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.True(t, result.Range(v))
	v.Major++
	assert.False(t, result.Range(v))
}

func assertRangeMatch(t *testing.T, input string, other string) {
	defer func() {
		recover()
	}()
	result := node_semver.Tokenize(input)
	v := node_semver.Tokenize(other).Version
	assert.Truef(t, result.Range(*v), "Expected %s to match %s", input, other)
}

func assertRangeNotMatch(t *testing.T, input string, other string) {
	defer func() {
		recover()
	}()
	result := node_semver.Tokenize(input)
	assert.Equal(t, result.Value, node_semver.TokenizeResultValueRange)
	v := node_semver.Tokenize(other).Version
	assert.NotNil(t, v)
	assert.Falsef(t, result.Range(*v), "Expected %s NOT to match %s", input, other)

}

func TestMultiCaret(t *testing.T) {
	assertRangeMatch(t, "^1.2.3 || ^2.4", "1.2.3")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "1.3.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.1")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.2")

	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.0")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.1")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.2")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "2.3.0")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "2.5.0")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.0.0")
}

func BenchmarkSimple(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		node_semver.Tokenize("1.2.3")
	}

}

func BenchmarkCaret(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		node_semver.Tokenize("^1.2.3")
	}
}

func BenchmarkCaretComplex(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		node_semver.Tokenize("^1.2.3 || ^2.3")
	}
}

func TestEqualVersions(t *testing.T) {
	for _, v := range fixtures.EqualVersions() {
		result := node_semver.Tokenize(v[0])
		plain := node_semver.Tokenize(v[1]).Version
		assert.NotNil(t, &result.Version, v[0])
		assert.True(t, result.Version.EQ(*plain))
	}
}

func TestRangeInclusive(t *testing.T) {
	for _, v := range fixtures.RangesInclusive() {
		assertRangeMatch(t, v[0], v[1])
	}
}

func TestRangeExclusive(t *testing.T) {
	for _, v := range fixtures.RangeExclude() {
		assertRangeNotMatch(t, v[0], v[1])
	}
}
