import { forwardRef } from 'react';
import { LinkProps } from '../types';
import { calcHrefByNavigationState, calcNextNavigationState } from '../utils';
import { setNavigationParams } from '../actions';

export const Link = forwardRef<
    HTMLAnchorElement,
    LinkProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>((props, ref) => {
    const { to, children, onWillRedirect = () => {}, ...otherProps } = props;

    const params = { page: to[0], ...(to[1] ?? {}) };

    return (
        <a
            ref={ref}
            href={calcHrefByNavigationState(
                calcNextNavigationState(params, true),
            )}
            onClick={async (e) => {
                e.preventDefault();
                await onWillRedirect();
                setNavigationParams(params, true);
            }}
            {...otherProps}
        >
            {children}
        </a>
    );
});
