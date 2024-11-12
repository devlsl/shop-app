import { breakpoints } from '../../consts/breakpoints';
import { Breakpoint } from '../../types/breakpoint';
import { breakpointToMedia } from './breakpointToMedia';

export const matchMediaBreakpoint = (
    value: keyof typeof breakpoints | Breakpoint,
) =>
    window.matchMedia(
        breakpointToMedia(
            typeof value === 'string' ? breakpoints[value] : value,
        ),
    ).matches;
