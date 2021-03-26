package node_semver_test

import (
	"fmt"
	"math/rand"
	"sort"
	"testing"

	goblin "github.com/franela/goblin"

	"github.com/jarred-sumner/devserverless/resolver/node_semver"
	"github.com/jarred-sumner/devserverless/resolver/node_semver/fixtures"
	. "github.com/onsi/gomega"
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

func TestMultipleVersionsAnd(t *testing.T) {
	assertRangeMatch(t, ">1.2.1 <1.2.3", "1.2.2")
	assertRangeNotMatch(t, ">1.2.1 <1.2.3", "1.2.1")
	assertRangeNotMatch(t, ">1.2.1 <1.2.3", "1.2.3")
	assertRangeNotMatch(t, ">1.2.1 <1.2.3", "1.3.2")
	assertRangeNotMatch(t, ">1.2.1 <1.2.3", "1.1.2")
	assertRangeNotMatch(t, ">1.2.1 <1.2.3", "2.1.2")
}

func TestCaretVersion(t *testing.T) {
	assertRangeMatch(t, "^1.2.1", "1.2.1")
	assertRangeMatch(t, "^1.2.1", "1.3.0")
	assertRangeMatch(t, "^1.2.1", "1.3.1")
	assertRangeNotMatch(t, "^1.2.1", "1.2.0")
	assertRangeNotMatch(t, "^ 1.2.1 ", "1.1.1")
	assertRangeNotMatch(t, "^1.2.1", "2.0.0")
}

func TestCaretWithWhitespace(t *testing.T) {
	assertRangeMatch(t, "^ 1 .X || 2.4", "1.2.1")
	assertRangeMatch(t, "^ 1 .X || 2.4", "1.3.0")
	assertRangeMatch(t, "^ 1 .X || 2.4", "1.3.1")
	assertRangeMatch(t, "^ 1 .X || 2.4", "2.4.2")
	assertRangeNotMatch(t, "^ 1.x || 2.4", "2.2.0")
	assertRangeNotMatch(t, "^ 1.x || 2.4", "2.3.0")
	assertRangeNotMatch(t, "^ 1.x || 2.4", "2.5.0")
	assertRangeNotMatch(t, "^ 1.x || 2.4", "2.0.0")
}

func TestWhitespaceCheckDoesntPRoduceInvalidResults(t *testing.T) {
	assertRangeMatch(t, "^ 1 || 2.4", "1.2.1")
	assertRangeMatch(t, "^ 1 || 2.4", "1.3.0")
	assertRangeMatch(t, "^ 1 || 2.4", "1.3.1")
	assertRangeMatch(t, "^ 1 || 2.4", "2.4.2")
	assertRangeNotMatch(t, "^ 1 || 2.4", "2.2.0")
	assertRangeNotMatch(t, "^ 1 || 2.4", "2.3.0")
	assertRangeNotMatch(t, "^ 1 || 2.4", "2.5.0")
	assertRangeNotMatch(t, "^ 1 || 2.4", "2.0.0")
}

func TestTildaMajor(t *testing.T) {
	assertRangeMatch(t, "^ 1 ", "1.0.0")
	assertRangeMatch(t, "^ 1 ", "1.2.0")
	assertRangeMatch(t, "^ 1 ", "1.1.0")
	assertRangeNotMatch(t, "^ 1 ", "2.0.0")
	assertRangeNotMatch(t, "^ 1 ", "0.0.0")
	assertRangeNotMatch(t, "^ 1 ", "0.5.0")
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

func TestCaretBehavior(t *testing.T) {
	// assertRangeNotMatch(t, "^1.20.0||^2.0.0", "1.19.0")
	assertRangeMatch(t, "^1.20.0||^2.0.0", "2.42.2")
	assertRangeMatch(t, "^1.20.0||^2.0.0", "1.20.0")
	assertRangeMatch(t, "^1.20.0||^2.0.0", "1.25.2")
	assertRangeMatch(t, "^1.20.0||^2.0.0", "2.0.0")
	assertRangeMatch(t, "^1.20.0||^2.0.0", "2.10.4")
}

func TestMultiCaret(t *testing.T) {
	assertRangeMatch(t, "^1.2.3 || ^2.4", "1.2.3")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "1.3.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.1")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.4.2")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.5.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.5.1")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.6.0")
	assertRangeMatch(t, "^1.2.3 || ^2.4", "2.6.1")

	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.0")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.1")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.2.2")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "2.3.0")
	assertRangeNotMatch(t, "^1.2.3 || ^2.4", "1.0.0")
}

func BenchmarkSimple(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		node_semver.Tokenize("1.2.3")
	}
}
func BenchmarkSimpleCheck(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		tok := node_semver.Tokenize("1.2.3")
		tok.TestString("1.2.3")
	}
}

func BenchmarkAdvancedCheck(b *testing.B) {
	b.ReportAllocs()
	b.ResetTimer()
	for n := 0; n < b.N; n++ {
		tok := node_semver.Tokenize("^1.2.3")
		tok.TestString("1.2.8")
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

func TestLTRange(t *testing.T) {
	assertRangeMatch(t, "<2.0.0", "0.2.9")
}

func shuffleInPlace(isArray []string) {
	l := len(isArray) - 1
	for i := 0; i <= l; i++ {
		n := rand.Intn(l)
		// swap
		x := isArray[i]
		isArray[i] = isArray[n]
		isArray[n] = x
	}
}

func TestRanges(t *testing.T) {
	g := goblin.Goblin(t)
	RegisterFailHandler(func(m string, _ ...int) { g.Fail(m) })

	g.Describe("TestStringify", func() {
		for _, v := range fixtures.Strings() {
			g.It(fmt.Sprintf("%s should stringify to %s", v, v), func() {
				result := node_semver.Tokenize(v)
				Expect(result.Version.String()).To(Equal(v))
			})
		}
	})

	g.Describe("Manual Ranges", func() {
		for _, v := range fixtures.ManualRanges() {
			g.It(fmt.Sprintf("%s should match %s", v[0], v[1]), func() {
				result := node_semver.Tokenize(v[0])

				Expect(result.TestString(v[1])).To(Equal(true))
			})
		}
	})

	g.Describe("Compare", func() {

		g.It("Major > Minor", func() {
			major := node_semver.Version{Major: 1, Minor: 0, Patch: 0}
			minor := node_semver.Version{Major: 0, Minor: 1}
			Expect(major.Compare(minor)).To(Equal(1))
		})

		g.It("Minor > Patch", func() {
			major := node_semver.Version{Major: 0, Minor: 1, Patch: 0}
			minor := node_semver.Version{Patch: 1}
			Expect(major.Compare(minor)).To(Equal(1))
		})

		g.It("Pre > Not Pre", func() {
			major := node_semver.Version{Major: 0, Minor: 1, Patch: 0}
			minor := node_semver.Version{Patch: 1}
			Expect(major.Compare(minor)).To(Equal(1))
		})

		g.It("Sorting Test", func() {

			correct := fixtures.StringsToSort()
			shuffled := fixtures.StringsToSort()

			shuffleInPlace(shuffled)

			sortable := make(node_semver.Versions, len(shuffled))
			for i, v := range shuffled {
				sortable[i] = *node_semver.Tokenize(v).Version
			}

			sort.Sort(sortable)
			stringified := make([]string, len(sortable))
			for i, v := range sortable {
				stringified[i] = v.String()
			}

			Expect(stringified).To(Equal(correct))
		})
	})

	g.Describe("TestRangeInclusive", func() {
		for _, v := range fixtures.RangesInclusive() {
			g.It(fmt.Sprintf("%s should match %s", v[0], v[1]), func() {
				result := node_semver.Tokenize(v[0])
				Expect(result.TestString(v[1])).To(BeTrue())
			})
		}
	})
	g.Describe("TestRangeExclusive", func() {
		for _, v := range fixtures.RangeExclude() {
			g.It(fmt.Sprintf("%s should not match %s", v[0], v[1]), func() {
				result := node_semver.Tokenize(v[0])

				Expect(result.TestString(v[1])).To(Equal(false))
			})
		}
	})

	// [range, version, options]
	// g.Describe("TestVersionGreaterThanRange", func() {
	// 	for _, v := range fixtures.VersionGTRange() {
	// 		version := v[1]

	// 		g.It(fmt.Sprintf("%s should be greater than %s", version, v[0]), func() {
	// 			result := node_semver.Tokenize(version)

	// 			Expect(result.TestString(v[0])).To(Equal(false))
	// 		})
	// 	}
	// })

	// g.Describe("TestVersionNOTGreaterThanRange", func() {
	// 	for _, v := range fixtures.VersionsNotGTRange() {
	// 		version := v[1]

	// 		g.It(fmt.Sprintf("%s should NOT be greater than %s", version, v[0]), func() {
	// 			result := node_semver.Tokenize(version)

	// 			Expect(result.TestString(v[0])).To(Equal(false))
	// 		})
	// 	}
	// })
}
