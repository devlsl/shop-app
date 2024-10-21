import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import styled, { css, keyframes } from 'styled-components';
import { pushNotification } from '../../hooks/useAppState';
import { Portal } from '../../components/portal';

const mountingOverlay = keyframes`
    0% {
        backdrop-filter: blur(0px);
        opacity: 0;
    }
    100% {
        backdrop-filter: blur(1px);
        opacity: 1;
    }
`;

const unmountingOverlay = keyframes`
    0% {
        backdrop-filter: blur(1px);
        opacity: 1;
    }
    100% {
        backdrop-filter: blur(0px);
        opacity: 0;
    }
`;

const Overlay = styled(Dialog.Overlay).attrs({ forceMount: true })<{
    $animationDuration: string;
    $animationFillMode: string;
    $unmounting: boolean;
}>`
    position: fixed;
    inset: 0;

    background-color: ${({ theme }) => theme.dialog.overlay.bgColor};

    display: flex;
    justify-content: center;
    align-items: center;

    animation-name: ${mountingOverlay};
    animation-duration: ${({ $animationDuration }) => $animationDuration};
    animation-fill-mode: ${({ $animationFillMode }) => $animationFillMode};
    ${({ $unmounting }) =>
        $unmounting &&
        css`
            animation-name: ${unmountingOverlay};
        `}
`;

const mountingContentWrapper = keyframes`
    0% {
        opacity: 0;
        transform: translateY(2px);
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

const unmountingContentWrapper = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0px);
    }
    100% {
        transform: translateY(2px);
        opacity: 0;
    }
`;

const Content = styled(Dialog.Content).attrs({ forceMount: true })<{
    $animationDuration: string;
    $animationFillMode: string;
    $unmounting: boolean;
}>`
    background-color: ${({ theme }) => theme.dialog.content.bgColor};
    box-shadow: ${({ theme }) => theme.dialog.content.shadow};

    padding: 10px;
    width: 200px;
    border-radius: 8px;
    overflow: hidden;

    animation-name: ${mountingContentWrapper};
    animation-duration: ${({ $animationDuration }) => $animationDuration};
    animation-fill-mode: ${({ $animationFillMode }) => $animationFillMode};
    ${({ $unmounting }) =>
        $unmounting &&
        css`
            animation-name: ${unmountingContentWrapper};
        `}
`;

const Gapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    padding-top: 14px;
`;

const CloseDialogWrapper = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
`;

const CloseIcon = styled(X).attrs({ size: 20 })`
    stroke-width: 3px;
`;

const CloseButton = () => (
    <CloseDialogWrapper>
        <Dialog.Close asChild>
            <button>
                <CloseIcon />
            </button>
        </Dialog.Close>
    </CloseDialogWrapper>
);

export const DialogDemo = ({
    mounted,
    unmounting,
    toggle,
    animStyles,
}: {
    mounted: boolean;
    unmounting: boolean;
    toggle: (nextValue: boolean) => void;
    animStyles: {
        animationDuration: string;
        animationFillMode: string;
    };
}) => {
    return (
        <Portal asChild container={document.querySelector('#dialogs')}>
            <Dialog.Root open={mounted} onOpenChange={toggle}>
                {mounted ? (
                    <>
                        <Dialog.DialogTitle>Hello</Dialog.DialogTitle>
                        <Dialog.DialogDescription>фыв</Dialog.DialogDescription>
                        <Overlay
                            $animationDuration={animStyles.animationDuration}
                            $animationFillMode={animStyles.animationFillMode}
                            $unmounting={unmounting}
                        >
                            <Content
                                $animationDuration={
                                    animStyles.animationDuration
                                }
                                $animationFillMode={
                                    animStyles.animationFillMode
                                }
                                $unmounting={unmounting}
                            >
                                <CloseButton />
                                <Gapper>
                                    <button
                                        onClick={() =>
                                            pushNotification('error', 'heeeee')
                                        }
                                    >
                                        addError
                                    </button>
                                    <button
                                        onClick={() =>
                                            pushNotification('info', 'heeeee')
                                        }
                                    >
                                        addInfo
                                    </button>
                                    <button
                                        onClick={() =>
                                            pushNotification(
                                                'neutral',
                                                'heeeee',
                                            )
                                        }
                                    >
                                        addNeutral
                                    </button>
                                    <button
                                        onClick={() =>
                                            pushNotification(
                                                'success',
                                                'heeeee',
                                            )
                                        }
                                    >
                                        addSuccess
                                    </button>
                                </Gapper>
                            </Content>
                        </Overlay>
                    </>
                ) : null}
            </Dialog.Root>
        </Portal>
    );
};
