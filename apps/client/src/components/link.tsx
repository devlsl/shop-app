import { forwardRef } from 'react';
import {
    getHrefFromUrlState,
    getNextUrlState,
    setUrlParams,
} from '../modules/url';

export type LinkProps<Props> = Omit<Props, 'href' | 'onClick'> & {
    onWillRedirect?: () => Promise<void> | void;
    to: Record<string, string | undefined | null>;
};

export const Link = forwardRef<
    HTMLAnchorElement,
    LinkProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>((props, ref) => {
    const { to, children, onWillRedirect = () => {}, ...otherProps } = props;

    return (
        <a
            ref={ref}
            href={getHrefFromUrlState(getNextUrlState(to, true))}
            onClick={async (e) => {
                e.preventDefault();
                await onWillRedirect();
                setUrlParams(to, true);
            }}
            {...otherProps}
        >
            {children}
        </a>
    );
});
