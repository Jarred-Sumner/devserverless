package lockfile

import (
 "errors"
 "bytes"
 "encoding/json"
 "github.com/jarred-sumner/peechy/buffer"
)
type PackageProvider uint

const (
  PackageProviderNpm PackageProvider = 1
  PackageProviderGit PackageProvider = 2
  PackageProviderHttps PackageProvider = 3
  PackageProviderTgz PackageProvider = 4
  PackageProviderDisk PackageProvider = 5
  PackageProviderOther PackageProvider = 6

)

var PackageProviderToString = map[PackageProvider]string{
  PackageProviderNpm: "PackageProviderNpm",
  PackageProviderGit: "PackageProviderGit",
  PackageProviderHttps: "PackageProviderHttps",
  PackageProviderTgz: "PackageProviderTgz",
  PackageProviderDisk: "PackageProviderDisk",
  PackageProviderOther: "PackageProviderOther",

}

var PackageProviderToID = map[string]PackageProvider{
  "PackageProviderNpm": PackageProviderNpm,
  "PackageProviderGit": PackageProviderGit,
  "PackageProviderHttps": PackageProviderHttps,
  "PackageProviderTgz": PackageProviderTgz,
  "PackageProviderDisk": PackageProviderDisk,
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

        
type VersionRange uint

const (
  VersionRangeNone VersionRange = 1
  VersionRangeTilda VersionRange = 2
  VersionRangeCaret VersionRange = 3
  VersionRangeComplex VersionRange = 4

)

var VersionRangeToString = map[VersionRange]string{
  VersionRangeNone: "VersionRangeNone",
  VersionRangeTilda: "VersionRangeTilda",
  VersionRangeCaret: "VersionRangeCaret",
  VersionRangeComplex: "VersionRangeComplex",

}

var VersionRangeToID = map[string]VersionRange{
  "VersionRangeNone": VersionRangeNone,
  "VersionRangeTilda": VersionRangeTilda,
  "VersionRangeCaret": VersionRangeCaret,
  "VersionRangeComplex": VersionRangeComplex,

}


// MarshalJSON marshals the enum as a quoted json string
func (s VersionRange) MarshalJSON() ([]byte, error) {
  buffer := bytes.NewBufferString(`"`)
  buffer.WriteString(VersionRangeToString[s])
  buffer.WriteString(`"`)
  return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *VersionRange) UnmarshalJSON(b []byte) error {
  var j string
  err := json.Unmarshal(b, &j)
  if err != nil {
    return err
  }
  // Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
  *s = VersionRangeToID[j]
  return nil
}

        
type PackageResolutionStatus uint

const (
  PackageResolutionStatusSuccess PackageResolutionStatus = 1
  PackageResolutionStatusMissingName PackageResolutionStatus = 2
  PackageResolutionStatusMissingVersion PackageResolutionStatus = 3
  PackageResolutionStatusNotFound PackageResolutionStatus = 4
  PackageResolutionStatusCorruptPackage PackageResolutionStatus = 5
  PackageResolutionStatusRateLimit PackageResolutionStatus = 6
  PackageResolutionStatusInvalidVersion PackageResolutionStatus = 7
  PackageResolutionStatusInternal PackageResolutionStatus = 8

)

var PackageResolutionStatusToString = map[PackageResolutionStatus]string{
  PackageResolutionStatusSuccess: "PackageResolutionStatusSuccess",
  PackageResolutionStatusMissingName: "PackageResolutionStatusMissingName",
  PackageResolutionStatusMissingVersion: "PackageResolutionStatusMissingVersion",
  PackageResolutionStatusNotFound: "PackageResolutionStatusNotFound",
  PackageResolutionStatusCorruptPackage: "PackageResolutionStatusCorruptPackage",
  PackageResolutionStatusRateLimit: "PackageResolutionStatusRateLimit",
  PackageResolutionStatusInvalidVersion: "PackageResolutionStatusInvalidVersion",
  PackageResolutionStatusInternal: "PackageResolutionStatusInternal",

}

var PackageResolutionStatusToID = map[string]PackageResolutionStatus{
  "PackageResolutionStatusSuccess": PackageResolutionStatusSuccess,
  "PackageResolutionStatusMissingName": PackageResolutionStatusMissingName,
  "PackageResolutionStatusMissingVersion": PackageResolutionStatusMissingVersion,
  "PackageResolutionStatusNotFound": PackageResolutionStatusNotFound,
  "PackageResolutionStatusCorruptPackage": PackageResolutionStatusCorruptPackage,
  "PackageResolutionStatusRateLimit": PackageResolutionStatusRateLimit,
  "PackageResolutionStatusInvalidVersion": PackageResolutionStatusInvalidVersion,
  "PackageResolutionStatusInternal": PackageResolutionStatusInternal,

}


// MarshalJSON marshals the enum as a quoted json string
func (s PackageResolutionStatus) MarshalJSON() ([]byte, error) {
  buffer := bytes.NewBufferString(`"`)
  buffer.WriteString(PackageResolutionStatusToString[s])
  buffer.WriteString(`"`)
  return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *PackageResolutionStatus) UnmarshalJSON(b []byte) error {
  var j string
  err := json.Unmarshal(b, &j)
  if err != nil {
    return err
  }
  // Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
  *s = PackageResolutionStatusToID[j]
  return nil
}

        
type BareField uint

const (
  BareFieldOtherField BareField = 1
  BareFieldModuleField BareField = 2
  BareFieldBrowserField BareField = 3
  BareFieldJsdelivrField BareField = 4
  BareFieldMainField BareField = 5
  BareFieldExportsField BareField = 6
  BareFieldGuessedField BareField = 7

)

var BareFieldToString = map[BareField]string{
  BareFieldOtherField: "BareFieldOtherField",
  BareFieldModuleField: "BareFieldModuleField",
  BareFieldBrowserField: "BareFieldBrowserField",
  BareFieldJsdelivrField: "BareFieldJsdelivrField",
  BareFieldMainField: "BareFieldMainField",
  BareFieldExportsField: "BareFieldExportsField",
  BareFieldGuessedField: "BareFieldGuessedField",

}

var BareFieldToID = map[string]BareField{
  "BareFieldOtherField": BareFieldOtherField,
  "BareFieldModuleField": BareFieldModuleField,
  "BareFieldBrowserField": BareFieldBrowserField,
  "BareFieldJsdelivrField": BareFieldJsdelivrField,
  "BareFieldMainField": BareFieldMainField,
  "BareFieldExportsField": BareFieldExportsField,
  "BareFieldGuessedField": BareFieldGuessedField,

}


// MarshalJSON marshals the enum as a quoted json string
func (s BareField) MarshalJSON() ([]byte, error) {
  buffer := bytes.NewBufferString(`"`)
  buffer.WriteString(BareFieldToString[s])
  buffer.WriteString(`"`)
  return buffer.Bytes(), nil
}

// UnmarshalJSON unmashals a quoted json string to the enum value
func (s *BareField) UnmarshalJSON(b []byte) error {
  var j string
  err := json.Unmarshal(b, &j)
  if err != nil {
    return err
  }
  // Note that if the string cannot be found then it will be set to the zero value, 'Created' in this case.
  *s = BareFieldToID[j]
  return nil
}

        
type ExportsManifest struct {
Bare    []string     `json:"bare" redis:"bare"`
Source    []string     `json:"source" redis:"source"`
Destination    []string     `json:"destination" redis:"destination"`
BareField    []BareField     `json:"bareField" redis:"bareField"`
}

func DecodeExportsManifest(buf *buffer.Buffer) (ExportsManifest, error) {
   result := ExportsManifest{}

  var length uint;
  length = buf.ReadVarUint();
  result.Bare = make([]string, length)
  for j := uint(0); j < length; j++ { result.Bare[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.Source = make([]string, length)
  for j := uint(0); j < length; j++ { result.Source[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.Destination = make([]string, length)
  for j := uint(0); j < length; j++ { result.Destination[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.BareField = make([]BareField, length)
  for j := uint(0); j < length; j++ { result.BareField[j] = BareField(buf.ReadByte()); }
  return result, nil;
}

func (i *ExportsManifest) Encode(buf *buffer.Buffer) error {

    var n uint;
    n = uint(len(i.Bare))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Bare[j]);
    }

    n = uint(len(i.Source))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Source[j]);
    }

    n = uint(len(i.Destination))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Destination[j]);
    }

    n = uint(len(i.BareField))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteByte(byte(i.BareField[j]))
    }
  return nil
}

type ExportsManifestSingleton struct {
Bare    string     `json:"bare" redis:"bare"`
Source    []string     `json:"source" redis:"source"`
Destination    []string     `json:"destination" redis:"destination"`
BareField    BareField     `json:"bareField" redis:"bareField"`
}

func DecodeExportsManifestSingleton(buf *buffer.Buffer) (ExportsManifestSingleton, error) {
   result := ExportsManifestSingleton{}

  var length uint;
  result.Bare = buf.ReadAlphanumeric()
  length = buf.ReadVarUint();
  result.Source = make([]string, length)
  for j := uint(0); j < length; j++ { result.Source[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.Destination = make([]string, length)
  for j := uint(0); j < length; j++ { result.Destination[j] = buf.ReadAlphanumeric(); }
  result.BareField = BareField(buf.ReadByte())
  return result, nil;
}

func (i *ExportsManifestSingleton) Encode(buf *buffer.Buffer) error {

    var n uint;
    buf.WriteAlphanumeric(i.Bare);

    n = uint(len(i.Source))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Source[j]);
    }

    n = uint(len(i.Destination))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Destination[j]);
    }

    buf.WriteByte(byte(i.BareField))
  return nil
}

type Version struct {
Major    int     `json:"major" redis:"major"`
Minor    int     `json:"minor" redis:"minor"`
Patch    int     `json:"patch" redis:"patch"`
Range    VersionRange     `json:"range" redis:"range"`
Pre    string     `json:"pre" redis:"pre"`
Build    string     `json:"build" redis:"build"`
}

func DecodeVersion(buf *buffer.Buffer) (Version, error) {
   result := Version{}

  result.Major = buf.ReadVarInt()
  result.Minor = buf.ReadVarInt()
  result.Patch = buf.ReadVarInt()
  result.Range = VersionRange(buf.ReadByte())
  result.Pre = buf.ReadString()
  result.Build = buf.ReadString()
  return result, nil;
}

func (i *Version) Encode(buf *buffer.Buffer) error {

    buf.WriteVarInt(i.Major);

    buf.WriteVarInt(i.Minor);

    buf.WriteVarInt(i.Patch);

    buf.WriteByte(byte(i.Range))

    buf.WriteString(i.Pre);

    buf.WriteString(i.Build);
  return nil
}

type RawDependencyList struct {
Count    uint     `json:"count" redis:"count"`
Names    []string     `json:"names" redis:"names"`
Versions    []string     `json:"versions" redis:"versions"`
}

func DecodeRawDependencyList(buf *buffer.Buffer) (RawDependencyList, error) {
   result := RawDependencyList{}

  var length uint;
  result.Count = buf.ReadVarUint()
  length = buf.ReadVarUint();
  result.Names = make([]string, length)
  for j := uint(0); j < length; j++ { result.Names[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.Versions = make([]string, length)
  for j := uint(0); j < length; j++ { result.Versions[j] = buf.ReadString(); }
  return result, nil;
}

func (i *RawDependencyList) Encode(buf *buffer.Buffer) error {

    var n uint;
    buf.WriteVarUint(i.Count);

    n = uint(len(i.Names))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Names[j]);
    }

    n = uint(len(i.Versions))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.Versions[j]);
    }
  return nil
}

type JavascriptPackageManifest struct {
Hash    string     `json:"hash" redis:"hash"`
Count    uint     `json:"count" redis:"count"`
Name    []string     `json:"name" redis:"name"`
Version    []string     `json:"version" redis:"version"`
DependencyIndex    []uint     `json:"dependencyIndex" redis:"dependencyIndex"`
Provider    PackageProvider     `json:"provider" redis:"provider"`
ExportsManifest    ExportsManifest     `json:"exportsManifest" redis:"exportsManifest"`
ExportsManifestIndex    []uint     `json:"exportsManifestIndex" redis:"exportsManifestIndex"`
Dependencies    []uint     `json:"dependencies" redis:"dependencies"`
}

func DecodeJavascriptPackageManifest(buf *buffer.Buffer) (JavascriptPackageManifest, error) {
   result := JavascriptPackageManifest{}

var err error;
  var length uint;
  result.Hash = buf.ReadString()
  result.Count = buf.ReadVarUint()
  length = buf.ReadVarUint();
  result.Name = make([]string, length)
  for j := uint(0); j < length; j++ { result.Name[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.Version = make([]string, length)
  for j := uint(0); j < length; j++ { result.Version[j] = buf.ReadString(); }
  length = buf.ReadVarUint();
  result.DependencyIndex = make([]uint, length)
  for j := uint(0); j < length; j++ { result.DependencyIndex[j] = buf.ReadVarUint(); }
  result.Provider = PackageProvider(buf.ReadByte())
  result.ExportsManifest, err = DecodeExportsManifest(buf)
  if err != nil {
    return result, err;
  }
  length = buf.ReadVarUint();
  result.ExportsManifestIndex = make([]uint, length)
  for j := uint(0); j < length; j++ { result.ExportsManifestIndex[j] = buf.ReadVarUint(); }
  length = buf.ReadVarUint();
  result.Dependencies = make([]uint, length)
  for j := uint(0); j < length; j++ { result.Dependencies[j] = buf.ReadVarUint(); }
  return result, nil;
}

func (i *JavascriptPackageManifest) Encode(buf *buffer.Buffer) error {

var err error;
    var n uint;
    buf.WriteString(i.Hash);

    buf.WriteVarUint(i.Count);

    n = uint(len(i.Name))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.Name[j]);
    }

    n = uint(len(i.Version))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.Version[j]);
    }

    n = uint(len(i.DependencyIndex))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteVarUint(i.DependencyIndex[j]);
    }

    buf.WriteByte(byte(i.Provider))

    err =i.ExportsManifest.Encode(buf)
    if err != nil {
 return err
}


    n = uint(len(i.ExportsManifestIndex))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteVarUint(i.ExportsManifestIndex[j]);
    }

    n = uint(len(i.Dependencies))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteVarUint(i.Dependencies[j]);
    }
  return nil
}

type ResolvedJavascriptPackageTag struct {
Name    string     `json:"name" redis:"name"`
FromVersion    string     `json:"fromVersion" redis:"fromVersion"`
Version    Version     `json:"version" redis:"version"`
}

func DecodeResolvedJavascriptPackageTag(buf *buffer.Buffer) (ResolvedJavascriptPackageTag, error) {
   result := ResolvedJavascriptPackageTag{}

var err error;
  result.Name = buf.ReadAlphanumeric()
  result.FromVersion = buf.ReadAlphanumeric()
  result.Version, err = DecodeVersion(buf)
  if err != nil {
    return result, err;
  }
  return result, nil;
}

func (i *ResolvedJavascriptPackageTag) Encode(buf *buffer.Buffer) error {

var err error;
    buf.WriteAlphanumeric(i.Name);

    buf.WriteAlphanumeric(i.FromVersion);

    err =i.Version.Encode(buf)
    if err != nil {
 return err
}

  return nil
}

type JavascriptPackageManifestPartial struct {
Name    string     `json:"name" redis:"name"`
Version    Version     `json:"version" redis:"version"`
Provider    PackageProvider     `json:"provider" redis:"provider"`
Status    PackageResolutionStatus     `json:"status" redis:"status"`
ExportsManifest    ExportsManifestSingleton     `json:"exportsManifest" redis:"exportsManifest"`
DependencyNames    []string     `json:"dependencyNames" redis:"dependencyNames"`
DependencyVersions    []string     `json:"dependencyVersions" redis:"dependencyVersions"`
PeerDependencyNames    []string     `json:"peerDependencyNames" redis:"peerDependencyNames"`
PeerDependencyVersions    []string     `json:"peerDependencyVersions" redis:"peerDependencyVersions"`
DevDependencyNames    []string     `json:"devDependencyNames" redis:"devDependencyNames"`
DevDependencyVersions    []string     `json:"devDependencyVersions" redis:"devDependencyVersions"`
ScriptKeys    []string     `json:"scriptKeys" redis:"scriptKeys"`
ScriptValues    []string     `json:"scriptValues" redis:"scriptValues"`
BinKeys    []string     `json:"binKeys" redis:"binKeys"`
BinValues    []string     `json:"binValues" redis:"binValues"`
HasPostInstall    bool     `json:"hasPostInstall" redis:"hasPostInstall"`
}

func DecodeJavascriptPackageManifestPartial(buf *buffer.Buffer) (JavascriptPackageManifestPartial, error) {
   result := JavascriptPackageManifestPartial{}

  var length uint;
var err error;
  result.Name = buf.ReadAlphanumeric()
  result.Version, err = DecodeVersion(buf)
  if err != nil {
    return result, err;
  }
  result.Provider = PackageProvider(buf.ReadByte())
  result.Status = PackageResolutionStatus(buf.ReadByte())
  result.ExportsManifest, err = DecodeExportsManifestSingleton(buf)
  if err != nil {
    return result, err;
  }
  length = buf.ReadVarUint();
  result.DependencyNames = make([]string, length)
  for j := uint(0); j < length; j++ { result.DependencyNames[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.DependencyVersions = make([]string, length)
  for j := uint(0); j < length; j++ { result.DependencyVersions[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.PeerDependencyNames = make([]string, length)
  for j := uint(0); j < length; j++ { result.PeerDependencyNames[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.PeerDependencyVersions = make([]string, length)
  for j := uint(0); j < length; j++ { result.PeerDependencyVersions[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.DevDependencyNames = make([]string, length)
  for j := uint(0); j < length; j++ { result.DevDependencyNames[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.DevDependencyVersions = make([]string, length)
  for j := uint(0); j < length; j++ { result.DevDependencyVersions[j] = buf.ReadAlphanumeric(); }
  length = buf.ReadVarUint();
  result.ScriptKeys = make([]string, length)
  for j := uint(0); j < length; j++ { result.ScriptKeys[j] = buf.ReadString(); }
  length = buf.ReadVarUint();
  result.ScriptValues = make([]string, length)
  for j := uint(0); j < length; j++ { result.ScriptValues[j] = buf.ReadString(); }
  length = buf.ReadVarUint();
  result.BinKeys = make([]string, length)
  for j := uint(0); j < length; j++ { result.BinKeys[j] = buf.ReadString(); }
  length = buf.ReadVarUint();
  result.BinValues = make([]string, length)
  for j := uint(0); j < length; j++ { result.BinValues[j] = buf.ReadString(); }
  result.HasPostInstall = buf.ReadBool()
  return result, nil;
}

func (i *JavascriptPackageManifestPartial) Encode(buf *buffer.Buffer) error {

    var n uint;
var err error;
    buf.WriteAlphanumeric(i.Name);

    err =i.Version.Encode(buf)
    if err != nil {
 return err
}


    buf.WriteByte(byte(i.Provider))

    buf.WriteByte(byte(i.Status))

    err =i.ExportsManifest.Encode(buf)
    if err != nil {
 return err
}


    n = uint(len(i.DependencyNames))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.DependencyNames[j]);
    }

    n = uint(len(i.DependencyVersions))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.DependencyVersions[j]);
    }

    n = uint(len(i.PeerDependencyNames))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.PeerDependencyNames[j]);
    }

    n = uint(len(i.PeerDependencyVersions))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.PeerDependencyVersions[j]);
    }

    n = uint(len(i.DevDependencyNames))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.DevDependencyNames[j]);
    }

    n = uint(len(i.DevDependencyVersions))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteAlphanumeric(i.DevDependencyVersions[j]);
    }

    n = uint(len(i.ScriptKeys))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.ScriptKeys[j]);
    }

    n = uint(len(i.ScriptValues))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.ScriptValues[j]);
    }

    n = uint(len(i.BinKeys))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.BinKeys[j]);
    }

    n = uint(len(i.BinValues))
    buf.WriteVarUint(n);
    for j := uint(0); j < n; j++ {
      buf.WriteString(i.BinValues[j]);
    }

    buf.WriteBool(i.HasPostInstall);
  return nil
}

type JavascriptPackageRequest struct {
ClientVersion    *string     `json:"clientVersion" redis:"clientVersion"`
Name    *string     `json:"name" redis:"name"`
EnableDenylist    *bool     `json:"enableDenylist" redis:"enableDenylist"`
Manifest    *JavascriptPackageManifestPartial     `json:"manifest" redis:"manifest"`
}

func DecodeJavascriptPackageRequest(buf *buffer.Buffer) (JavascriptPackageRequest, error) {
   result := JavascriptPackageRequest{}

var err error;
var fieldType uint;
  for {
    switch fieldType = buf.ReadVarUint(); fieldType {
    case 0:
      return result, nil;

    case 1:
      client_version_0 := buf.ReadString()
      result.ClientVersion = &client_version_0

    case 2:
      name_1 := buf.ReadAlphanumeric()
      result.Name = &name_1

    case 3:
      enable_denylist_2 := buf.ReadBool()
      result.EnableDenylist = &enable_denylist_2

    case 4:
      var manifest_3 JavascriptPackageManifestPartial;
      manifest_3, err = DecodeJavascriptPackageManifestPartial(buf)
      result.Manifest = &manifest_3
      if err != nil {
        return result, err;
      }

    default:
      return result, errors.New("attempted to parse invalid message");
    }
  }
}

func (i *JavascriptPackageRequest) Encode(buf *buffer.Buffer) error {

var err error;
  if i.ClientVersion != nil {
    buf.WriteVarUint(1);
    buf.WriteString(*i.ClientVersion);
   }

  if i.Name != nil {
    buf.WriteVarUint(2);
    buf.WriteAlphanumeric(*i.Name);
   }

  if i.EnableDenylist != nil {
    buf.WriteVarUint(3);
    buf.WriteBool(*i.EnableDenylist);
   }

  if i.Manifest != nil {
    buf.WriteVarUint(4);
    err =i.Manifest.Encode(buf)
    if err != nil {
 return err
}

   }
  buf.WriteVarUint(0);
  return nil
}

type ErrorCode uint

const (
  ErrorCodeGeneric ErrorCode = 1
  ErrorCodeMissingPackageName ErrorCode = 2
  ErrorCodeServerDown ErrorCode = 3
  ErrorCodeVersionDoesntExit ErrorCode = 4

)

var ErrorCodeToString = map[ErrorCode]string{
  ErrorCodeGeneric: "ErrorCodeGeneric",
  ErrorCodeMissingPackageName: "ErrorCodeMissingPackageName",
  ErrorCodeServerDown: "ErrorCodeServerDown",
  ErrorCodeVersionDoesntExit: "ErrorCodeVersionDoesntExit",

}

var ErrorCodeToID = map[string]ErrorCode{
  "ErrorCodeGeneric": ErrorCodeGeneric,
  "ErrorCodeMissingPackageName": ErrorCodeMissingPackageName,
  "ErrorCodeServerDown": ErrorCodeServerDown,
  "ErrorCodeVersionDoesntExit": ErrorCodeVersionDoesntExit,

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
Name    *string     `json:"name" redis:"name"`
Result    *JavascriptPackageManifest     `json:"result" redis:"result"`
ErrorCode    *ErrorCode     `json:"errorCode" redis:"errorCode"`
Message    *string     `json:"message" redis:"message"`
Checksum    *string     `json:"checksum" redis:"checksum"`
}

func DecodeJavascriptPackageResponse(buf *buffer.Buffer) (JavascriptPackageResponse, error) {
   result := JavascriptPackageResponse{}

var err error;
var fieldType uint;
  for {
    switch fieldType = buf.ReadVarUint(); fieldType {
    case 0:
      return result, nil;

    case 1:
      name_0 := buf.ReadAlphanumeric()
      result.Name = &name_0

    case 2:
      var result_1 JavascriptPackageManifest;
      result_1, err = DecodeJavascriptPackageManifest(buf)
      result.Result = &result_1
      if err != nil {
        return result, err;
      }

    case 3:
      error_code_2 := ErrorCode(buf.ReadVarUint())
      result.ErrorCode = &error_code_2

    case 4:
      message_3 := buf.ReadString()
      result.Message = &message_3

    case 5:
      checksum_4 := buf.ReadString()
      result.Checksum = &checksum_4

    default:
      return result, errors.New("attempted to parse invalid message");
    }
  }
}

func (i *JavascriptPackageResponse) Encode(buf *buffer.Buffer) error {

var err error;
  if i.Name != nil {
    buf.WriteVarUint(1);
    buf.WriteAlphanumeric(*i.Name);
   }

  if i.Result != nil {
    buf.WriteVarUint(2);
    err =i.Result.Encode(buf)
    if err != nil {
 return err
}

   }

  if i.ErrorCode != nil {
    buf.WriteVarUint(3);
    buf.WriteVarUint(uint(*i.ErrorCode))
   }

  if i.Message != nil {
    buf.WriteVarUint(4);
    buf.WriteString(*i.Message);
   }

  if i.Checksum != nil {
    buf.WriteVarUint(5);
    buf.WriteString(*i.Checksum);
   }
  buf.WriteVarUint(0);
  return nil
}

