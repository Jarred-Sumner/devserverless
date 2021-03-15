package Lockfile

import (
	"bytes"
	"encoding/json"
	"errors"

	"github.com/jarred-sumner/peechy/buffer"
)

type PackageProvider uint

const (
	PackageProviderNpm   PackageProvider = 1
	PackageProviderGit   PackageProvider = 2
	PackageProviderHttps PackageProvider = 3
	PackageProviderTgz   PackageProvider = 4
	PackageProviderOther PackageProvider = 5
)

var PackageProviderToString = map[PackageProvider]string{
	PackageProviderNpm:   "PackageProviderNpm",
	PackageProviderGit:   "PackageProviderGit",
	PackageProviderHttps: "PackageProviderHttps",
	PackageProviderTgz:   "PackageProviderTgz",
	PackageProviderOther: "PackageProviderOther",
}

var PackageProviderToID = map[string]PackageProvider{
	"PackageProviderNpm":   PackageProviderNpm,
	"PackageProviderGit":   PackageProviderGit,
	"PackageProviderHttps": PackageProviderHttps,
	"PackageProviderTgz":   PackageProviderTgz,
	"PackageProviderOther": PackageProviderOther,
}

// MarshalJSON marshals the enum as a quoted json string
func (s PackageProvider) MarshalJSON() ([]byte, error) {
	buffer := bytes.NewBufferString(`"`)
	buffer.WriteString(PackageProviderToString[s])
	buffer.WriteString(`"`)
	return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *PackageProvider) UnmarshalJSON(b []byte) error {
	var j string
	err := json.Unmarshal(b, &j)
	if err != nil {
		return err
	}
	// Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
	*s = PackageProviderToID[j]
	return nil
}

type ExportsType uint

const (
	ExportsTypeCommonJs ExportsType = 1
	ExportsTypeEsModule ExportsType = 2
	ExportsTypeBrowser  ExportsType = 3
)

var ExportsTypeToString = map[ExportsType]string{
	ExportsTypeCommonJs: "ExportsTypeCommonJs",
	ExportsTypeEsModule: "ExportsTypeEsModule",
	ExportsTypeBrowser:  "ExportsTypeBrowser",
}

var ExportsTypeToID = map[string]ExportsType{
	"ExportsTypeCommonJs": ExportsTypeCommonJs,
	"ExportsTypeEsModule": ExportsTypeEsModule,
	"ExportsTypeBrowser":  ExportsTypeBrowser,
}

// MarshalJSON marshals the enum as a quoted json string
func (s ExportsType) MarshalJSON() ([]byte, error) {
	buffer := bytes.NewBufferString(`"`)
	buffer.WriteString(ExportsTypeToString[s])
	buffer.WriteString(`"`)
	return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *ExportsType) UnmarshalJSON(b []byte) error {
	var j string
	err := json.Unmarshal(b, &j)
	if err != nil {
		return err
	}
	// Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
	*s = ExportsTypeToID[j]
	return nil
}

type ExportsManifest struct {
	Source      []string      `json:"source"`
	Destination []string      `json:"destination"`
	ExportType  []ExportsType `json:"exportType"`
}

func DecodeExportsManifest(buf *buffer.Buffer) (ExportsManifest, error) {
	result := ExportsManifest{}

	var length uint
	length = buf.ReadVarUint()
	result.Source = make([]string, length)
	for j := uint(0); j < length; j++ {
		result.Source[j] = buf.ReadAlphanumeric()
	}
	length = buf.ReadVarUint()
	result.Destination = make([]string, length)
	for j := uint(0); j < length; j++ {
		result.Destination[j] = buf.ReadAlphanumeric()
	}
	length = buf.ReadVarUint()
	result.ExportType = make([]ExportsType, length)
	for j := uint(0); j < length; j++ {
		result.ExportType[j] = ExportsType(buf.ReadByte())
	}
	return result, nil
}

func (i *ExportsManifest) Encode(buf *buffer.Buffer) error {

	var n uint
	n = uint(len(i.Source))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteAlphanumeric(i.Source[j])
	}

	n = uint(len(i.Destination))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteAlphanumeric(i.Destination[j])
	}

	n = uint(len(i.ExportType))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteByte(byte(i.ExportType[j]))
	}
	return nil
}

type Version struct {
	Major int    `json:"major"`
	Minor int    `json:"minor"`
	Patch int    `json:"patch"`
	Pre   string `json:"pre"`
	Build string `json:"build"`
}

func DecodeVersion(buf *buffer.Buffer) (Version, error) {
	result := Version{}

	result.Major = buf.ReadVarInt()
	result.Minor = buf.ReadVarInt()
	result.Patch = buf.ReadVarInt()
	result.Pre = buf.ReadString()
	result.Build = buf.ReadString()
	return result, nil
}

func (i *Version) Encode(buf *buffer.Buffer) error {

	buf.WriteVarInt(i.Major)

	buf.WriteVarInt(i.Minor)

	buf.WriteVarInt(i.Patch)

	buf.WriteString(i.Pre)

	buf.WriteString(i.Build)
	return nil
}

type JavascriptPackageInput struct {
	Name         *string            `json:"name"`
	Version      *string            `json:"version"`
	Dependencies *RawDependencyList `json:"dependencies"`
}

func DecodeJavascriptPackageInput(buf *buffer.Buffer) (JavascriptPackageInput, error) {
	result := JavascriptPackageInput{}

	var err error
	var fieldType uint
	for {
		switch fieldType = buf.ReadVarUint(); fieldType {
		case 0:
			return result, nil

		case 1:
			name_0 := buf.ReadAlphanumeric()
			result.Name = &name_0

		case 2:
			version_1 := buf.ReadString()
			result.Version = &version_1

		case 3:
			var dependencies_2 RawDependencyList
			dependencies_2, err = DecodeRawDependencyList(buf)
			result.Dependencies = &dependencies_2
			if err != nil {
				return result, err
			}

		default:
			return result, errors.New("attempted to parse invalid message")
		}
	}
}

func (i *JavascriptPackageInput) Encode(buf *buffer.Buffer) error {

	var err error
	if i.Name != nil {
		buf.WriteVarUint(1)
		buf.WriteAlphanumeric(*i.Name)
	}

	if i.Version != nil {
		buf.WriteVarUint(2)
		buf.WriteString(*i.Version)
	}

	if i.Dependencies != nil {
		buf.WriteVarUint(3)
		err = i.Dependencies.Encode(buf)
		if err != nil {
			return err
		}

	}
	buf.WriteVarUint(0)
	return nil
}

type RawDependencyList struct {
	Count    uint     `json:"count"`
	Names    []string `json:"names"`
	Versions []string `json:"versions"`
}

func DecodeRawDependencyList(buf *buffer.Buffer) (RawDependencyList, error) {
	result := RawDependencyList{}

	var length uint
	result.Count = buf.ReadVarUint()
	length = buf.ReadVarUint()
	result.Names = make([]string, length)
	for j := uint(0); j < length; j++ {
		result.Names[j] = buf.ReadAlphanumeric()
	}
	length = buf.ReadVarUint()
	result.Versions = make([]string, length)
	for j := uint(0); j < length; j++ {
		result.Versions[j] = buf.ReadString()
	}
	return result, nil
}

func (i *RawDependencyList) Encode(buf *buffer.Buffer) error {

	var n uint
	buf.WriteVarUint(i.Count)

	n = uint(len(i.Names))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteAlphanumeric(i.Names[j])
	}

	n = uint(len(i.Versions))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteString(i.Versions[j])
	}
	return nil
}

type JavascriptPackageManifest struct {
	Count                uint              `json:"count"`
	Name                 []string          `json:"name"`
	Version              []Version         `json:"version"`
	Providers            []PackageProvider `json:"providers"`
	Dependencies         []uint            `json:"dependencies"`
	DependenciesIndex    []uint            `json:"dependenciesIndex"`
	ExportsManifest      ExportsManifest   `json:"exportsManifest"`
	ExportsManifestIndex []uint            `json:"exportsManifestIndex"`
}

func DecodeJavascriptPackageManifest(buf *buffer.Buffer) (JavascriptPackageManifest, error) {
	result := JavascriptPackageManifest{}

	var err error
	var length uint
	result.Count = buf.ReadVarUint()
	length = buf.ReadVarUint()
	result.Name = make([]string, length)
	for j := uint(0); j < length; j++ {
		result.Name[j] = buf.ReadAlphanumeric()
	}
	length = buf.ReadVarUint()
	result.Version = make([]Version, length)
	for j := uint(0); j < length; j++ {
		result.Version[j], err = DecodeVersion(buf)
		if err != nil {
			return result, err
		}
	}
	length = buf.ReadVarUint()
	result.Providers = make([]PackageProvider, length)
	for j := uint(0); j < length; j++ {
		result.Providers[j] = PackageProvider(buf.ReadByte())
	}
	length = buf.ReadVarUint()
	result.Dependencies = make([]uint, length)
	for j := uint(0); j < length; j++ {
		result.Dependencies[j] = buf.ReadVarUint()
	}
	length = buf.ReadVarUint()
	result.DependenciesIndex = make([]uint, length)
	for j := uint(0); j < length; j++ {
		result.DependenciesIndex[j] = buf.ReadVarUint()
	}
	result.ExportsManifest, err = DecodeExportsManifest(buf)
	if err != nil {
		return result, err
	}
	length = buf.ReadVarUint()
	result.ExportsManifestIndex = make([]uint, length)
	for j := uint(0); j < length; j++ {
		result.ExportsManifestIndex[j] = buf.ReadVarUint()
	}
	return result, nil
}

func (i *JavascriptPackageManifest) Encode(buf *buffer.Buffer) error {

	var err error
	var n uint
	buf.WriteVarUint(i.Count)

	n = uint(len(i.Name))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteAlphanumeric(i.Name[j])
	}

	n = uint(len(i.Version))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		err := i.Version[j].Encode(buf)
		if err != nil {
			return err
		}

	}

	n = uint(len(i.Providers))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteByte(byte(i.Providers[j]))
	}

	n = uint(len(i.Dependencies))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteVarUint(i.Dependencies[j])
	}

	n = uint(len(i.DependenciesIndex))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteVarUint(i.DependenciesIndex[j])
	}

	err = i.ExportsManifest.Encode(buf)
	if err != nil {
		return err
	}

	n = uint(len(i.ExportsManifestIndex))
	buf.WriteVarUint(n)
	for j := uint(0); j < n; j++ {
		buf.WriteVarUint(i.ExportsManifestIndex[j])
	}
	return nil
}

type JavascriptPackageRequest struct {
	ClientVersion        *string            `json:"clientVersion"`
	Name                 *string            `json:"name"`
	Dependencies         *RawDependencyList `json:"dependencies"`
	OptionalDependencies *RawDependencyList `json:"optionalDependencies"`
	DevDependencies      *RawDependencyList `json:"devDependencies"`
	PeerDependencies     *RawDependencyList `json:"peerDependencies"`
}

func DecodeJavascriptPackageRequest(buf *buffer.Buffer) (JavascriptPackageRequest, error) {
	result := JavascriptPackageRequest{}

	var err error
	var fieldType uint
	for {
		switch fieldType = buf.ReadVarUint(); fieldType {
		case 0:
			return result, nil

		case 1:
			client_version_0 := buf.ReadString()
			result.ClientVersion = &client_version_0

		case 2:
			name_1 := buf.ReadAlphanumeric()
			result.Name = &name_1

		case 3:
			var dependencies_2 RawDependencyList
			dependencies_2, err = DecodeRawDependencyList(buf)
			result.Dependencies = &dependencies_2
			if err != nil {
				return result, err
			}

		case 4:
			var optional_dependencies_3 RawDependencyList
			optional_dependencies_3, err = DecodeRawDependencyList(buf)
			result.OptionalDependencies = &optional_dependencies_3
			if err != nil {
				return result, err
			}

		case 5:
			var dev_dependencies_4 RawDependencyList
			dev_dependencies_4, err = DecodeRawDependencyList(buf)
			result.DevDependencies = &dev_dependencies_4
			if err != nil {
				return result, err
			}

		case 6:
			var peer_dependencies_5 RawDependencyList
			peer_dependencies_5, err = DecodeRawDependencyList(buf)
			result.PeerDependencies = &peer_dependencies_5
			if err != nil {
				return result, err
			}

		default:
			return result, errors.New("attempted to parse invalid message")
		}
	}
}

func (i *JavascriptPackageRequest) Encode(buf *buffer.Buffer) error {

	var err error
	if i.ClientVersion != nil {
		buf.WriteVarUint(1)
		buf.WriteString(*i.ClientVersion)
	}

	if i.Name != nil {
		buf.WriteVarUint(2)
		buf.WriteAlphanumeric(*i.Name)
	}

	if i.Dependencies != nil {
		buf.WriteVarUint(3)
		err = i.Dependencies.Encode(buf)
		if err != nil {
			return err
		}

	}

	if i.OptionalDependencies != nil {
		buf.WriteVarUint(4)
		err = i.OptionalDependencies.Encode(buf)
		if err != nil {
			return err
		}

	}

	if i.DevDependencies != nil {
		buf.WriteVarUint(5)
		err = i.DevDependencies.Encode(buf)
		if err != nil {
			return err
		}

	}

	if i.PeerDependencies != nil {
		buf.WriteVarUint(6)
		err = i.PeerDependencies.Encode(buf)
		if err != nil {
			return err
		}

	}
	buf.WriteVarUint(0)
	return nil
}

type ErrorCode uint

const (
	ErrorCodeGeneric            ErrorCode = 1
	ErrorCodeMissingPackageName ErrorCode = 2
	ErrorCodeServerDown         ErrorCode = 3
	ErrorCodeVersionDoesntExit  ErrorCode = 4
)

var ErrorCodeToString = map[ErrorCode]string{
	ErrorCodeGeneric:            "ErrorCodeGeneric",
	ErrorCodeMissingPackageName: "ErrorCodeMissingPackageName",
	ErrorCodeServerDown:         "ErrorCodeServerDown",
	ErrorCodeVersionDoesntExit:  "ErrorCodeVersionDoesntExit",
}

var ErrorCodeToID = map[string]ErrorCode{
	"ErrorCodeGeneric":            ErrorCodeGeneric,
	"ErrorCodeMissingPackageName": ErrorCodeMissingPackageName,
	"ErrorCodeServerDown":         ErrorCodeServerDown,
	"ErrorCodeVersionDoesntExit":  ErrorCodeVersionDoesntExit,
}

// MarshalJSON marshals the enum as a quoted json string
func (s ErrorCode) MarshalJSON() ([]byte, error) {
	buffer := bytes.NewBufferString(`"`)
	buffer.WriteString(ErrorCodeToString[s])
	buffer.WriteString(`"`)
	return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *ErrorCode) UnmarshalJSON(b []byte) error {
	var j string
	err := json.Unmarshal(b, &j)
	if err != nil {
		return err
	}
	// Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
	*s = ErrorCodeToID[j]
	return nil
}

type JavascriptPackageResponse struct {
	Name      *string                    `json:"name"`
	Result    *JavascriptPackageManifest `json:"result"`
	ErrorCode *ErrorCode                 `json:"errorCode"`
	Message   *string                    `json:"message"`
}

func DecodeJavascriptPackageResponse(buf *buffer.Buffer) (JavascriptPackageResponse, error) {
	result := JavascriptPackageResponse{}

	var err error
	var fieldType uint
	for {
		switch fieldType = buf.ReadVarUint(); fieldType {
		case 0:
			return result, nil

		case 1:
			name_0 := buf.ReadAlphanumeric()
			result.Name = &name_0

		case 2:
			var result_1 JavascriptPackageManifest
			result_1, err = DecodeJavascriptPackageManifest(buf)
			result.Result = &result_1
			if err != nil {
				return result, err
			}

		case 3:
			error_code_2 := ErrorCode(buf.ReadVarUint())
			result.ErrorCode = &error_code_2

		case 4:
			message_3 := buf.ReadString()
			result.Message = &message_3

		default:
			return result, errors.New("attempted to parse invalid message")
		}
	}
}

func (i *JavascriptPackageResponse) Encode(buf *buffer.Buffer) error {

	var err error
	if i.Name != nil {
		buf.WriteVarUint(1)
		buf.WriteAlphanumeric(*i.Name)
	}

	if i.Result != nil {
		buf.WriteVarUint(2)
		err = i.Result.Encode(buf)
		if err != nil {
			return err
		}

	}

	if i.ErrorCode != nil {
		buf.WriteVarUint(3)
		buf.WriteVarUint(uint(*i.ErrorCode))
	}

	if i.Message != nil {
		buf.WriteVarUint(4)
		buf.WriteString(*i.Message)
	}
	buf.WriteVarUint(0)
	return nil
}
