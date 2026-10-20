// ===== Simple In-Memory Cache =====
// Caches GitHub data to reduce API calls and respect rate limits

type CacheEntryInternal<T> = {
  data: T;
  timestamp: number;
  expiresAt: number;
};

class SimpleCache {
  private cache = new Map<string, CacheEntryInternal<any>>();

  set<T>(key: string, data: T, ttlMs: number = 3600000): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttlMs,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const cache = new SimpleCache();

// ===== Startup Fetch =====
// Only execute on server (not during client bundling)
if (typeof process !== "undefined") {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  if (GITHUB_TOKEN && GITHUB_USERNAME) {
    const cacheKey = `github-history-${GITHUB_USERNAME}`;

    // Dynamic import to prevent client-side bundling
    import("./github.server").then(({ fetchGitHubProjectHistory }) => {
      fetchGitHubProjectHistory(GITHUB_USERNAME, GITHUB_TOKEN)
        .then((projectHistory) => {
          cache.set(cacheKey, projectHistory, 3600000);
          console.log(`Initialized GitHub history cache: ${projectHistory.length} years`);
        })
        .catch((error) => {
          console.error("Failed to initialize GitHub cache on startup:", error);
        });
    });
  }
}
