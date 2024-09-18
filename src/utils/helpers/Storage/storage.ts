interface storage<T> {
    save: (items: Array<T>) => void;
    get: () => Array<T>;
    addListener: (listener: (key: string) => void) => storageListener;
}

type storageListener = {
    remove: () => void;
}