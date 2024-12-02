import styled from 'styled-components';
import { Portal } from '../../portal';
import { css } from 'styled-components';
import { breakpoint } from '../../../features/breakpoints';
import {
    removeNotificationById,
    useNotifications,
} from '../../../shared/hooks/useAppState';
import { NotificationItem } from './item';

const NotificationsWrapper = styled.div`
    position: fixed;
    right: 6px;
    bottom: 6px;
    z-index: 99;

    ${breakpoint(
        'showBottomBar',
        css`
            left: 6px;
        `,
    )}
`;

export const NotificationsView = () => {
    const items = useNotifications();

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
                        duration={7000}
                        onUnmount={() => removeNotificationById(item.id)}
                    />
                ))}
            </NotificationsWrapper>
        </Portal>
    );
};
