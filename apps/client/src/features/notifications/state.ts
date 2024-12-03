import { create } from 'zustand';
import { NotificationState } from './types';

export const useNotificationState = create<NotificationState>(() => ({
    items: [],
}));
