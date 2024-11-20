import styled, { css, keyframes } from 'styled-components';
import { Portal } from '../../portal';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useMountAnim } from '../../../hooks/useMountAnim';
import { staticStyles } from '../../../shared/consts/styles/static';
import { transition } from '../../../shared/utils/styles/transition';

const Overlay = styled(RadixDialog.Overlay).attrs({ forceMount: true })<{
    $animationDuration: string;
    $animationFillMode: string;
    $unmounting: boolean;
}>`
    position: fixed;
    inset: 0;
    padding: 8px;

    background-color: ${({ theme }) => theme.dialog.overlay};

    display: flex;
    justify-content: center;
    align-items: center;

    animation-name: ${keyframes`
    0% {
        backdrop-filter: blur(0px);
        opacity: 0;
    }
    100% {
        backdrop-filter: blur(3px);
        opacity: 1;
    }
`};
    animation-duration: ${({ $animationDuration }) => $animationDuration};
    animation-fill-mode: ${({ $animationFillMode }) => $animationFillMode};
    ${({ $unmounting }) =>
        $unmounting &&
        css`
            animation-name: ${keyframes`
    0% {
        backdrop-filter: blur(3px);
        opacity: 1;
    }
    100% {
        backdrop-filter: blur(0px);
        opacity: 0;
    }
`};
        `}
`;

const Paper = styled(RadixDialog.Content).attrs({ forceMount: true })<{
    $animationDuration: string;
    $animationFillMode: string;
    $unmounting: boolean;
    $maxWidth?: string;
    $maxHeight?: string;
}>`
    ${transition('background', 'color', 'border-color')}
    background-color: ${({ theme }) => theme.dialog.paper};
    border-radius: ${staticStyles.border.radius};
    padding: ${staticStyles.paddings.square};
    overflow: auto;
    max-height: 100%;
    max-width: 100%;

    ${({ $maxWidth }) =>
        $maxWidth &&
        css`
            width: 100%;
            max-width: ${$maxWidth};
        `}

    ${({ $maxHeight }) =>
        $maxHeight &&
        css`
            height: 100%;
            max-height: ${$maxHeight};
        `}

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.dialog.foreground.background};
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) =>
            theme.dialog.foreground.hover.background};
    }

    &::-webkit-scrollbar-thumb:active {
        background-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};
    }

    animation-name: ${keyframes`
        0% {
            opacity: 0;
            transform: translateY(2px);
        }
        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    `};

    animation-duration: ${({ $animationDuration }) => $animationDuration};
    animation-fill-mode: ${({ $animationFillMode }) => $animationFillMode};

    ${({ $unmounting }) =>
        $unmounting &&
        css`
            animation-name: ${keyframes`
                0% {
                    opacity: 1;
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(2px);
                    opacity: 0;
                }
            `};
        `}
`;

export const Dialog = ({
    isOpen,
    onClose,
    contentSlot,
    title,
    description,
    maxWidth,
    maxHeight,
}: {
    isOpen: boolean;
    onClose: () => void;
    contentSlot: React.ReactNode;
    title: string;
    description: string;
    maxWidth?: string;
    maxHeight?: string;
}) => {
    const {
        mounted,
        styles: animStyles,
        unmounting,
    } = useMountAnim(isOpen, staticStyles.transition.duration);
    if (!mounted) return null;

    return (
        <Portal asChild container={document.querySelector('#dialogs')}>
            <RadixDialog.Root open={mounted} onOpenChange={onClose}>
                {mounted ? (
                    <>
                        <RadixDialog.DialogTitle>
                            {title}
                        </RadixDialog.DialogTitle>
                        <RadixDialog.DialogDescription>
                            {description}
                        </RadixDialog.DialogDescription>
                        <Overlay
                            $animationDuration={animStyles.animationDuration}
                            $animationFillMode={animStyles.animationFillMode}
                            $unmounting={unmounting}
                        >
                            <Paper
                                $animationDuration={
                                    animStyles.animationDuration
                                }
                                $animationFillMode={
                                    animStyles.animationFillMode
                                }
                                $unmounting={unmounting}
                                $maxWidth={maxWidth}
                                $maxHeight={maxHeight}
                            >
                                {contentSlot}
                            </Paper>
                        </Overlay>
                    </>
                ) : null}
            </RadixDialog.Root>
        </Portal>
    );
};
