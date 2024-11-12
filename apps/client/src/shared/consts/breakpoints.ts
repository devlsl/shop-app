import { Breakpoint } from '../types/breakpoint';

type BreakpointsMap = Record<string, Breakpoint>;

export const breakpoints = {
    showBottomBar: { max: 687 },
    oneColumnInContentGrid: { max: 400 },
    twoColumnsInContentGrid: { max: 550 },
    threeColumnsInContentGrid: { max: 650 },
} as const satisfies BreakpointsMap;
