import { create } from 'zustand';

export type Notification = {
    type: 'success' | 'info' | 'error' | 'neutral';
    text: string;
    id: string;
};

type AppState = {
    notifications: Notification[];
    isShownSignInView: boolean;
};

const useAppState = create<AppState>(() => ({
    notifications: [],
    isShownSignInView: false,
}));

export const useIsShownSignInView = () =>
    useAppState((state) => state.isShownSignInView);

export const useNotifications = () =>
    useAppState((state) => state.notifications);

export const pushNotification = (
    type: Notification['type'],
    text: Notification['text'],
) =>
    useAppState.setState((prev) => ({
        ...prev,
        notifications: [
            ...prev.notifications,
            { type, text, id: Math.random().toString(16).slice(2).slice(0, 6) },
        ],
    }));

export const popNotification = () =>
    useAppState.setState((prev) => ({
        ...prev,
        notifications: prev.notifications.slice(0, -1),
    }));

export const removeNotificationById = (id: string) =>
    useAppState.setState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((item) => item.id !== id),
    }));

export const setIsShownSignInView = (value: boolean) =>
    useAppState.setState({
        isShownSignInView: value,
    });

export const showSignInView = () =>
    useAppState.setState({
        isShownSignInView: true,
    });

export const hideSignInView = () =>
    useAppState.setState({
        isShownSignInView: false,
    });
