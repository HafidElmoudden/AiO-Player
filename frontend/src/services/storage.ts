export enum StorageKey {
    VOLUME_KEY = 'volume_key',
} 

export class LocalStorageService {
    static get(key) {
        return window.localStorage.getItem(key);
    }

    static set(key, value) {
        window.localStorage.setItem(key, value);
    }

    static remove(key) {
        window.localStorage.removeItem(key);
    }

    static clear() {
        window.localStorage.clear();
    }
}