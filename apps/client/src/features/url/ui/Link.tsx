import { forwardRef } from 'react';
import { getHrefFromUrlState, getNextUrlState } from '../utils';
import { setUrlParams } from '../actions';
import { LinkProps } from '../types';

export const Link = forwardRef<
    HTMLAnchorElement,
    LinkProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>((props, ref) => {
    const { to, children, onWillRedirect = () => {}, ...otherProps } = props;

    const params = { page: to[0], ...(to[1] ?? {}) };

    return (
        <a
            ref={ref}
            href={getHrefFromUrlState(getNextUrlState(params, true))}
            onClick={async (e) => {
                e.preventDefault();
                await onWillRedirect();
                setUrlParams(params, true);
            }}
            {...otherProps}
        >
            {children}
        </a>
    );
});
