import { useNotificationState } from './state';
import { NotificationType } from './types';

export const pushNotification = (type: NotificationType, text: string) =>
    useNotificationState.setState((prev) => ({
        ...prev,
        items: [
            ...prev.items,
            { type, text, id: Math.random().toString(16).slice(2).slice(0, 6) },
        ],
    }));

export const popNotification = () =>
    useNotificationState.setState((prev) => ({
        ...prev,
        items: prev.items.slice(0, -1),
    }));

export const removeNotificationById = (id: string) =>
    useNotificationState.setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
    }));
