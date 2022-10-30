enum CacheType {
  Local,
  Session
}

class Cache {
  public storage: Storage

  constructor(type: CacheType) {
    this.storage = type == CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value !== undefined && value !== null)
      this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key) ?? false
    if (value) return JSON.parse(value)
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
