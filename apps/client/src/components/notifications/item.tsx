import { useEffect, useRef, useState } from 'react';
import { useMountAnim } from '../../hooks/useMountAnim';
import styled, { css, keyframes } from 'styled-components';
import { animateUnmount } from '../../shared/utils/styles/animateUnmount';
import { Notification } from '../../hooks/useAppState';
import { transition } from '../../shared/utils/styles/transition';
import { X } from 'lucide-react';
import { typography } from '../../shared/utils/styles/typography';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';

const NotificationWrapper = styled.div<{ $variant: Notification['type'] }>`
    background-color: ${({ theme, $variant }) =>
        theme.notification[$variant].background};

    color: ${({ theme, $variant }) => theme.notification[$variant].text};

    ${breakpoint(
        'showBottomBar',
        css`
            width: 100%;
        `,
    )}
    width: fit-content;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 14px;
    padding: 8px 16px 8px 10px;
    margin-top: 6px;
    border-radius: 6px;

    ${typography()}

    ${breakpoint(
        'showBottomBar',
        css`
            font-size: 20px;
            font-weight: 700;
        `,
    )}

    ${transition('background-color', 'color')}
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    svg {
        ${breakpoint(
            'showBottomBar',
            css`
                width: 34px;
            `,
        )}

        width: 16px;
        stroke-width: 4px;
    }
`;

const NotificationView = ({
    close,
    text,
    type,
}: { close: () => void } & Notification) => {
    return (
        <NotificationWrapper $variant={type}>
            <CloseButton
                onClick={() => {
                    close();
                }}
            >
                <X />
            </CloseButton>
            {text}
        </NotificationWrapper>
    );
};

const Animated = styled.div<{ $unmounting: boolean }>`
    display: grid;

    ${breakpoint(
        'showBottomBar',
        css`
            justify-content: end;
        `,
    )}

    ${({ $unmounting }) =>
        animateUnmount(
            $unmounting,
            keyframes`
                from { grid-template-rows: 0fr; opacity: 0  }
                to {grid-template-rows: 1fr; opacity: 1 }
            `,
            keyframes`
                from { grid-template-rows: 1fr; opacity: 1  }
                to { grid-template-rows: 0fr; opacity: 0 }
            `,
        )};
`;

const MinHeightWrapper = styled.div`
    min-height: 0px;
`;

export const NotificationItem = ({
    isFirst,
    length,
    maxItems,
    text,
    id,
    type,
    onUnmount,
    duration,
}: Notification & {
    isFirst: boolean;
    length: number;
    maxItems?: number;
    onUnmount: () => void;
    duration?: number;
}) => {
    const [opened, setOpened] = useState(true);
    const {
        mounted,
        unmounting,
        styles: animStyles,
    } = useMountAnim(opened, 200, onUnmount);

    useEffect(() => {
        if (maxItems !== undefined && length > maxItems && isFirst)
            setOpened(false);
    }, [length, opened, mounted]);

    const timer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (duration !== undefined)
            timer.current = setTimeout(() => setOpened(false), duration);
        return () => clearTimeout(timer.current);
    }, []);

    return (
        <Animated $unmounting={unmounting} style={animStyles}>
            <MinHeightWrapper>
                <NotificationView
                    id={id}
                    text={text}
                    type={type}
                    close={() => setOpened(false)}
                />
            </MinHeightWrapper>
        </Animated>
    );
};
