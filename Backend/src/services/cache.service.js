/**
 * Simple in-memory caching service
 */
class CacheService {
    constructor() {
        this.cache = new Map();
        this.TTL = 5 * 60 * 1000; // 5 minutes cache
    }

    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + this.TTL,
        });
    }

    clear() {
        this.cache.clear();
    }
}

module.exports = new CacheService();
