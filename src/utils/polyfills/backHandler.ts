import { BackHandler } from 'react-native';

type BackPressHandler = () => boolean | null | undefined;
type BackPressSubscription = { remove: () => void };

const patched = BackHandler as unknown as {
    addEventListener: (eventName: string, handler: BackPressHandler) => BackPressSubscription;
    removeEventListener?: (eventName: string, handler: BackPressHandler) => void;
    __removeEventListenerPolyfilled?: boolean;
};

if (!patched.__removeEventListenerPolyfilled && typeof patched.removeEventListener !== 'function') {
    const subscriptions = new Map<BackPressHandler, BackPressSubscription>();
    const originalAdd = patched.addEventListener.bind(BackHandler);

    patched.addEventListener = (eventName, handler) => {
        const subscription = originalAdd(eventName, handler);
        subscriptions.set(handler, subscription);
        return subscription;
    };

    patched.removeEventListener = (_eventName, handler) => {
        const subscription = subscriptions.get(handler);
        if (subscription) {
            subscription.remove();
            subscriptions.delete(handler);
        }
    };

    patched.__removeEventListenerPolyfilled = true;
}
