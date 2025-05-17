interface StorageMmkv<T> {
    save: (items: T) => void;
    get: () => Promise<T>;
}