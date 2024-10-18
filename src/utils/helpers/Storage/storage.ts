interface storage<T> {
    save: (items: Array<T>) => void;
    get: () => Array<T>;
    addListener: (listener: (key: string) => void) => storageListener;
}

interface itemStorage<T> {
    save: (item: T) => void;
    get: () => T | undefined;
    addListener: (listener: (key: string) => void) => storageListener;
}

type storageListener = {
    remove: () => void;
}