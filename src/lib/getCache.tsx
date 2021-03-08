let _cache: Cache;
export async function getCache() {
  if (!_cache) {
    _cache = await globalThis.caches.open("bundles");
  }

  return _cache;
}
