import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { breakpoints } from './consts';
import { Breakpoint } from './types';

export const useBreakpoint = (value: keyof typeof breakpoints | Breakpoint) => {
    const { min, max } = (
        typeof value === 'string' ? breakpoints[value] : value
    ) as Breakpoint;
    if (min === undefined && max === undefined) return false;
    if (max === undefined) return useMediaQuery(`(min-width: ${min}px)`);
    if (min === undefined) return useMediaQuery(`(max-width: ${max}px)`);
    return useMediaQuery(`(min-width: ${min}px) and (max-width: ${max}px)`);
};
