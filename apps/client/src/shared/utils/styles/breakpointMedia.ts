import { css, RuleSet } from 'styled-components';
import { breakpoints } from '../../consts/breakpoints';
import { Breakpoint } from '../../types/breakpoint';
import { breakpointToMedia } from '../helpers/breakpointToMedia';

export const breakpoint = (
    value: keyof typeof breakpoints | Breakpoint,
    styles: RuleSet<object>,
) => {
    const media = breakpointToMedia(
        typeof value === 'string' ? breakpoints[value] : value,
    );
    return css`
        @media ${media} {
            ${styles}
        }
    `;
};
