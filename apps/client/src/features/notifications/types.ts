export type NotificationType = 'success' | 'info' | 'error' | 'neutral';

export type Notification = {
    type: NotificationType;
    text: string;
    id: string;
};

export type NotificationState = {
    items: Notification[];
};
