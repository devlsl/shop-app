import { useNotificationState } from './state';

export const useNotifications = () =>
    useNotificationState((state) => state.items);
