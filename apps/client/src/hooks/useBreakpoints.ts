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

// Работает если одновременно несколько breakpoints не могут быть true
// const breakpointsKeys = Object.keys(breakpoints) as BreakpointKey[];
// const breakpointsMedia = Object.entries(breakpoints).map(([key, value]) => [
//     key,
//     breakpointToMedia(value),
// ]) as [BreakpointKey, string][];

// export const useBreakpoints = () => {
//     const [value, setValue] = useState<BreakpointKey>(
//         breakpointsMedia.reduce(
//             (prev, [breakpoint, media]) =>
//                 window.matchMedia(media).matches ? breakpoint : prev,
//             breakpointsKeys[0],
//         ),
//     );

//     useEffect(() => {
//         const createHandler =
//             (key: BreakpointKey) => (e: MediaQueryListEvent) =>
//                 e.matches && setValue(key);

//         const listeners = Object.fromEntries(
//             breakpointsKeys.map((key) => [key, createHandler(key)]),
//         ) as Record<BreakpointKey, (e: MediaQueryListEvent) => void>;

//         breakpointsMedia.forEach(([key, value]) =>
//             window.matchMedia(value).addEventListener('change', listeners[key]),
//         );

//         return () =>
//             breakpointsMedia.forEach(([key, value]) =>
//                 window
//                     .matchMedia(value)
//                     .removeEventListener('change', listeners[key]),
//             );
//     }, []);

//     return value;
// };
