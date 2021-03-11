export function getPackageID() {
  return location.origin.substring(
    location.protocol.length + "//".length,
    location.origin.indexOf(".")
  );
}
