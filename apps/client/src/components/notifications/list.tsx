import styled from 'styled-components';
import { Portal } from '../portal';
import { Notification, removeNotificationById } from '../../hooks/useAppState';
import { NotificationItem } from './item';

const NotificationsWrapper = styled.div`
    position: fixed;
    right: 6px;
    bottom: 6px;
    z-index: 99;

    @media (max-width: 350px) {
        left: 6px;
        min-width: max-content;
    }
`;

export const NotificationsView = ({ items }: { items: Notification[] }) => {
    return (
        <Portal asChild container={document.querySelector('#notifications')}>
            <NotificationsWrapper>
                {items.map((item, i) => (
                    <NotificationItem
                        key={item.id}
                        {...item}
                        isFirst={i === 0}
                        length={items.length}
                        maxItems={3}
                        // duration={7000}
                        onUnmount={() => removeNotificationById(item.id)}
                    />
                ))}
            </NotificationsWrapper>
        </Portal>
    );
};
