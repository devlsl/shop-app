import * as Dialog from '@radix-ui/react-dialog';
import styles from './styles.module.css';
import cn from 'classnames';
import { Button } from '../button';
import { X } from 'lucide-react';
import { Typography } from '../typography';

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
        <Dialog.Root open={mounted} onOpenChange={toggle}>
            <Dialog.Portal>
                {mounted ? (
                    <>
                        <Dialog.DialogTitle>Hello</Dialog.DialogTitle>
                        <Dialog.DialogDescription>
                            HelloDeb
                        </Dialog.DialogDescription>
                        <Dialog.Overlay
                            className={cn(
                                styles.overlay,
                                unmounting && styles.unmounting,
                            )}
                            style={animStyles}
                            forceMount
                        >
                            <Dialog.Content
                                className={cn(
                                    styles.contentWrapper,
                                    unmounting && styles.unmounting,
                                )}
                                style={animStyles}
                            >
                                {/* <Dialog.Title className={styles.title}>
                                Edit profile
                                </Dialog.Title>
                                <Dialog.Description className={styles.description}>
                                Make changes to your profile here. Click save
                                when you're done.
                                </Dialog.Description> */}
                                <div className={styles.closeWrapper}>
                                    <Dialog.Close asChild>
                                        <Button
                                            className={styles.close}
                                            aria-label='Close'
                                        >
                                            <X className={styles.closeIcon} />
                                        </Button>
                                    </Dialog.Close>
                                </div>
                                <div className={styles.content}>
                                    <Typography>dsad</Typography>
                                    <Typography>dsad</Typography>
                                    <Typography>dsad</Typography>
                                    <Typography>dsad</Typography>
                                </div>
                            </Dialog.Content>
                        </Dialog.Overlay>
                    </>
                ) : null}
            </Dialog.Portal>
        </Dialog.Root>
    );
};
