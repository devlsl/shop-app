import * as RadixTooltip from '@radix-ui/react-tooltip';
import styled, { keyframes } from 'styled-components';
import { useMountAnim } from '../../hooks/useMountAnim';
import { useEffect, useState } from 'react';
import { animateUnmount } from '../../styles/animateUnmount';
import { Portal } from '../Portal';
import { staticStyles } from '../../consts/staticStyles';
import { typography } from '../../styles/typography';

const ContentWrapper = styled.div<{ $unmounting: boolean }>`
    background-color: ${({ theme }) => theme.button.secondary.background};
    color: ${({ theme }) => theme.button.secondary.text};
    border-radius: 3px;
    padding: 4px;
    ${typography({
        fontSize: '0.8rem',
        lineHeight: '0.8rem',
        fontWeight: 500,
    })}

    ${({ $unmounting }) =>
        animateUnmount(
            $unmounting,
            keyframes`
                from {  opacity: 0; transform: translateY(-1px) }
                to { opacity: 1; transform: translateY(0) }
            `,
            keyframes`
                from {opacity: 1; transform: translateY(0) }
                to {  opacity: 0; transform: translateY(-1px) }
            `,
        )};
`;

export const Tooltip = ({
    children,
    content,
    side,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: Parameters<typeof RadixTooltip.Content>[0]['side'];
}) => {
    const [opened, setOpened] = useState(false);
    const {
        mounted,
        unmounting,
        styles: animStyles,
    } = useMountAnim(opened, staticStyles.transition.duration);

    useEffect(() => {
        console.log({ opened, unmounting });
    }, [opened, unmounting]);
    return (
        <RadixTooltip.Provider delayDuration={0}>
            <RadixTooltip.Root open={opened} onOpenChange={setOpened}>
                <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
                <Portal container={document.querySelector('#dialogs')}>
                    {mounted && (
                        <RadixTooltip.Content
                            sideOffset={8}
                            forceMount
                            side={side}
                        >
                            <ContentWrapper
                                style={animStyles}
                                $unmounting={unmounting}
                            >
                                {content}
                            </ContentWrapper>
                        </RadixTooltip.Content>
                    )}
                </Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
