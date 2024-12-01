import { create } from 'zustand';

export type Notification = {
    type: 'success' | 'info' | 'error' | 'neutral';
    text: string;
    id: string;
};

type AppState = {
    notifications: Notification[];
    shownProductPreview: null | string;
    areShownProductFilters: boolean;
};

const useAppState = create<AppState>(() => ({
    notifications: [],
    shownProductPreview: null,
    areShownProductFilters: false,
}));

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

export const useShownProductPreview = () =>
    useAppState((state) => state.shownProductPreview);

export const showProductPreview = (productId: string) =>
    useAppState.setState({
        shownProductPreview: productId,
    });

export const hideProductPreview = () =>
    useAppState.setState({
        shownProductPreview: null,
    });

export const useAreShownProductFilters = () =>
    useAppState((state) => state.areShownProductFilters);

export const toggleAreShownProductFilters = () =>
    useAppState.setState((prev) => ({
        ...prev,
        areShownProductFilters: !prev.areShownProductFilters,
    }));
