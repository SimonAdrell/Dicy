import { MMKV } from "react-native-mmkv"

const languageStorage = (key: string): itemStorage<string> => {
    const storage = new MMKV()
    return {
        save: (languageCode: string) => storage.set(key, languageCode),
        get: () => storage.getString(key),
        addListener: (onValueChanged: (key: string) => void): storageListener => {
            let addedListener = storage.addOnValueChangedListener(onValueChanged)
            return {
                remove: () => {
                    addedListener.remove()
                }
            }
        }
    }
}

export { languageStorage };