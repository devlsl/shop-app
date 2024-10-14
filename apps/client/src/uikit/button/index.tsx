import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';
import { Loader } from '../loader';

export type Ref = HTMLButtonElement;

type Props = {
    variant?: 'primary' | 'secondary' | 'dangerous' | 'outline' | 'icon';
    children: React.ReactNode;
    isLoading?: boolean;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<Ref, Props>(
    (
        {
            children,
            isLoading = false,
            variant = 'secondary',
            disabled = false,
            className,
            ...other
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(styles.button, styles[variant], className)}
                {...other}
            >
                {isLoading ? <Loader /> : children}
            </button>
        );
    },
);
