import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader } from './loader';
import styles from './styles.module.css';
import cn from 'classnames';

export type Ref = HTMLButtonElement;

type Props = {
    children: React.ReactNode;
    isLoading?: boolean;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<Ref, Props>(
    ({ children, isLoading, disabled = false, className, ...other }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(styles.button, className)}
                {...other}
            >
                {isLoading ? <Loader /> : children}
            </button>
        );
    },
);
