import { useEffect, useRef, useState } from 'react';
import { useMountAnim } from '../../../hooks/useMountAnim';
import styled, { css, keyframes } from 'styled-components';
import { animateUnmount } from '../../../shared/utils/styles/animateUnmount';
import { Notification } from '../../../hooks/useAppState';
import { transition } from '../../../shared/utils/styles/transition';
import { XIcon } from 'lucide-react';
import { typography } from '../../../shared/utils/styles/typography';
import { breakpoint } from '../../../shared/utils/styles/breakpointMedia';
import { LinkIconButton } from '../../buttons/linkIconButton';
import { hover } from '../../../shared/utils/styles/hover';
import { useBreakpoint } from '../../../hooks/useBreakpoints';

const NotificationWrapper = styled.div<{ $variant: Notification['type'] }>`
    background-color: ${({ theme, $variant }) =>
        theme.notification[$variant].background};

    color: ${({ theme, $variant }) => theme.notification[$variant].text};

    ${breakpoint(
        'showBottomBar',
        css`
            max-width: 100%;
            width: 100%;
            gap: 6px;
            grid-template-columns: 1fr auto;
            padding: 0 4px 0 16px;
        `,
    )}

    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    overflow: hidden;

    gap: 2px;

    padding: 0 16px 0 4px;
    margin-top: 6px;
    border-radius: 6px;

    ${transition('background-color', 'color')}
`;

const Text = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${typography({ fontSize: '1.1rem', fontWeight: '600' })}
    ${breakpoint(
        'showBottomBar',
        css`
            font-size: 1.3rem;
            font-weight: 700;
        `,
    )}
    align-self: end;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: start; */

    height: 1.95rem;
    /* border: 1px solid red; */
`;

const Title = styled.span`
    display: inline;

    ${typography({
        fontWeight: 600,
        fontSize: '0.85rem',
        lineHeight: '0.85rem',
    })}
    max-width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    overflow-wrap: break-word;
    overflow: hidden;

    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            font-size: 1rem;
            line-height: 1rem;
        `,
    )}

    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            font-size: 1.3rem;
            line-height: 1.3rem;
        `,
    )}

color: ${({ theme }) => theme.button.secondary.text};

    ${transition('color')}
`;

const CloseButton = styled(LinkIconButton)<{ $variant: Notification['type'] }>`
    ${breakpoint(
        'showBottomBar',
        css`
            padding: 4px;
            svg {
                stroke-width: 4px;
            }
        `,
    )}
    svg {
        color: ${({ theme, $variant }) => theme.notification[$variant].text};
    }
    ${({ theme, $variant }) =>
        hover(css`
            svg {
                color: ${theme.notification[$variant].hover.text};
            }
        `)};

    &:active {
        svg {
            color: ${({ theme, $variant }) =>
                theme.notification[$variant].active.text};
        }
    }
`;

const NotificationView = ({
    close,
    text,
    type,
}: { close: () => void } & Notification) => {
    const isShownBottomBar = useBreakpoint('showBottomBar');
    return (
        <NotificationWrapper $variant={type}>
            {isShownBottomBar && <Text>{text}</Text>}

            <CloseButton
                $variant={type}
                onClick={() => {
                    close();
                }}
            >
                <XIcon />
            </CloseButton>

            {!isShownBottomBar && <Text>{text}</Text>}
        </NotificationWrapper>
    );
};

const Animated = styled.div<{ $unmounting: boolean }>`
    display: grid;

    justify-content: end;
    ${breakpoint(
        'showBottomBar',
        css`
            justify-content: stretch;
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