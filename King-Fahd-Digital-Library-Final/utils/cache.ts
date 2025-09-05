/**
 * Caching system for improved performance
 */

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export class CacheManager {
  private static instance: CacheManager;
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 1000;
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };

    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expired = 0;
    let valid = 0;

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expired++;
      } else {
        valid++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      hitRate: 0 // This would be calculated based on actual usage
    };
  }
}

// Service Worker Cache
export class ServiceWorkerCache {
  private static cacheName = 'king-fahd-library-v1';

  static async openCache(): Promise<Cache> {
    return await caches.open(this.cacheName);
  }

  static async cacheRequest(request: Request, response: Response): Promise<void> {
    const cache = await this.openCache();
    await cache.put(request, response);
  }

  static async getCachedResponse(request: Request): Promise<Response | undefined> {
    const cache = await this.openCache();
    return await cache.match(request);
  }

  static async clearCache(): Promise<void> {
    const cache = await this.openCache();
    const keys = await cache.keys();
    await Promise.all(keys.map(key => cache.delete(key)));
  }

  static async preloadResources(urls: string[]): Promise<void> {
    const cache = await this.openCache();
    await cache.addAll(urls);
  }
}

// Local Storage Cache
export class LocalStorageCache {
  private static prefix = 'kfqpc_cache_';

  static set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || 5 * 60 * 1000
    };

    try {
      localStorage.setItem(
        `${this.prefix}${key}`,
        JSON.stringify(item)
      );
    } catch (e) {
      console.warn('Failed to cache data in localStorage:', e);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(`${this.prefix}${key}`);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);

      // Check if item has expired
      if (Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem(`${this.prefix}${key}`);
        return null;
      }

      return item.data;
    } catch (e) {
      console.warn('Failed to get cached data from localStorage:', e);
      return null;
    }
  }

  static delete(key: string): void {
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  static clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Cache strategies
export enum CacheStrategy {
  CACHE_FIRST = 'cache-first',
  NETWORK_FIRST = 'network-first',
  CACHE_ONLY = 'cache-only',
  NETWORK_ONLY = 'network-only'
}

export class CacheStrategyManager {
  static async execute<T>(
    key: string,
    fetcher: () => Promise<T>,
    strategy: CacheStrategy = CacheStrategy.CACHE_FIRST,
    ttl?: number
  ): Promise<T> {
    const cache = CacheManager.getInstance();

    switch (strategy) {
      case CacheStrategy.CACHE_FIRST:
        const cached = cache.get<T>(key);
        if (cached !== null) {
          return cached;
        }
        const data = await fetcher();
        cache.set(key, data, ttl);
        return data;

      case CacheStrategy.NETWORK_FIRST:
        try {
          const data = await fetcher();
          cache.set(key, data, ttl);
          return data;
        } catch (error) {
          const cached = cache.get<T>(key);
          if (cached !== null) {
            return cached;
          }
          throw error;
        }

      case CacheStrategy.CACHE_ONLY:
        const cachedOnly = cache.get<T>(key);
        if (cachedOnly === null) {
          throw new Error('No cached data available');
        }
        return cachedOnly;

      case CacheStrategy.NETWORK_ONLY:
        return await fetcher();

      default:
        throw new Error('Unknown cache strategy');
    }
  }
}

// Initialize cache cleanup
export const initializeCacheCleanup = () => {
  const cache = CacheManager.getInstance();
  
  // Clean up expired items every 5 minutes
  setInterval(() => {
    cache.cleanup();
  }, 5 * 60 * 1000);
};
