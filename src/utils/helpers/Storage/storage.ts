// These interfaces are used as ambient globals (no imports needed in consuming files).
/* eslint-disable @typescript-eslint/no-unused-vars */
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
};
