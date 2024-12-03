import { Notifications } from './list';

export const NotificationsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <>
        {children}
        <Notifications />
    </>
);
