import { useMediaQuery } from './useMediaQuery';

export const useScreenWidth = ({
    less,
    more,
}: {
    less?: number;
    more?: number;
}) => {
    if (less === undefined && more === undefined) return false;
    if (less === undefined) return useMediaQuery(`(min-width: ${more}px)`);
    if (more === undefined) return useMediaQuery(`(min-width: ${less}px)`);
    return useMediaQuery(`(min-width: ${more}px) and (max-width: ${less}px)`);
};
