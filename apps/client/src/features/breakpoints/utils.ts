import { css, RuleSet } from 'styled-components';
import { breakpoints } from './consts';
import { Breakpoint } from './types';

export const breakpointToMedia = ({ min, max }: Breakpoint = {}) => {
    if (min === undefined && max === undefined) return '(min-width: 0px)';
    if (max === undefined) return `(min-width: ${min}px)`;
    if (min === undefined) return `(max-width: ${max}px)`;
    return `(min-width: ${min}px) and (max-width: ${max}px)`;
};

export const matchMediaBreakpoint = (
    value: keyof typeof breakpoints | Breakpoint,
) =>
    window.matchMedia(
        breakpointToMedia(
            typeof value === 'string' ? breakpoints[value] : value,
        ),
    ).matches;

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
