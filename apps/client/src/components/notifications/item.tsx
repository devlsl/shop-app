import { useEffect, useRef, useState } from 'react';
import { useMountAnim } from '../../hooks/useMountAnim';
import styled, { css, CSSProperties, keyframes } from 'styled-components';
import { animateUnmount } from '../../utils/animateUnmount';
import { Notification } from '../../hooks/useAppState';
import { animate } from '../../utils/animate';
import { X } from 'lucide-react';
import { typographyCSS } from '../../utils/typography';

const NotificationWrapper = styled.div<{ $variant: Notification['type'] }>`
    background-color: ${({ theme, $variant }) => {
        if (theme.isDark)
            return {
                success: '#2d3f26',
                info: '#535238',
                error: '#4f3632',
                neutral: '#404042',
            }[$variant];

        return {
            success: '#d4eccb',
            info: '#ebe9b4',
            error: '#ffd1d1',
            neutral: '#e8e8e8',
        }[$variant];
    }};

    color: ${({ theme, $variant }) => {
        if (theme.isDark)
            return {
                success: '#69ad65',
                info: '#c2bd7d',
                error: '#a45252',
                neutral: '#c7c7c7',
            }[$variant];

        return {
            success: '#57c152',
            info: '#959263',
            error: '#e66a6a',
            neutral: '#18181b',
        }[$variant];
    }};

    @media (max-width: 350px) {
        width: 100%;
    }
    width: fit-content;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 14px;
    padding: 8px 16px 8px 10px;
    margin-top: 6px;
    border-radius: 6px;

    ${typographyCSS()}

    ${animate('background-color', 'color')}
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    svg {
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
    @media (min-width: 350px) {
        justify-content: end;
    }

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
