import { breakpoints } from '../shared/consts/breakpoints';
import { Breakpoint } from '../shared/types/breakpoint';
import { useMediaQuery } from './useMediaQuery';

export const useBreakpoint = (value: keyof typeof breakpoints | Breakpoint) => {
    const { min, max } = (
        typeof value === 'string' ? breakpoints[value] : value
    ) as Breakpoint;
    if (min === undefined && max === undefined) return false;
    if (max === undefined) return useMediaQuery(`(min-width: ${min}px)`);
    if (min === undefined) return useMediaQuery(`(max-width: ${max}px)`);
    return useMediaQuery(`(min-width: ${min}px) and (max-width: ${max}px)`);
};
