import styled from 'styled-components';
import { css } from 'styled-components';
import { breakpoint } from '../../breakpoints';

import { NotificationItem } from './item';
import { useNotifications } from '../selectors';
import { removeNotificationById } from '../actions';
import { Portal } from '../../../shared/ui/Portal';

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

export const Notifications = () => {
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
