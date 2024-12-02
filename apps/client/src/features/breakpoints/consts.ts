import { BreakpointsMap } from './types';

export const breakpoints = {
    showBottomBar: { max: 687 },
    oneColumnInContentGrid: { max: 400 },
    twoColumnsInContentGrid: { max: 550 },
    threeColumnsInContentGrid: { max: 650 },
} as const satisfies BreakpointsMap;
