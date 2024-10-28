import { Breakpoint } from '../../types/breakpoint';

export const breakpointToMedia = ({ min, max }: Breakpoint = {}) => {
    if (min === undefined && max === undefined) return '(min-width: 0px)';
    if (max === undefined) return `(min-width: ${min}px)`;
    if (min === undefined) return `(max-width: ${max}px)`;
    return `(min-width: ${min}px) and (max-width: ${max}px)`;
};
