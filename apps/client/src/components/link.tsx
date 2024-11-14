import { forwardRef } from 'react';
import { navigate } from '../modules/url';
import { toUrl } from '../shared/utils/helpers/toUrl';

export type LinkProps<Props> = Omit<Props, 'href' | 'onClick'> & {
    onWillRedirect?: () => Promise<void> | void;
    to:
        | string
        | [
              pathname: string,
              searchParas?: Record<string, string | undefined | null>,
              hash?: string,
          ];
};

export const Link = forwardRef<
    HTMLAnchorElement,
    LinkProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>((props, ref) => {
    const { to, children, onWillRedirect = () => {}, ...otherProps } = props;
    const url = typeof to === 'string' ? to : toUrl(...to);
    return (
        <a
            ref={ref}
            href={url}
            onClick={async (e) => {
                e.preventDefault();
                await onWillRedirect();
                navigate(url);
            }}
            {...otherProps}
        >
            {children}
        </a>
    );
});
