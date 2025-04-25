interface storage<T> {
    save: (items: T) => void;
    get: () => Promise<T>;
}