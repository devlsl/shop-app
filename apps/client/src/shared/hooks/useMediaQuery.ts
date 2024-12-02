import { useEffect, useState } from 'react';

type UseMediaQueryOptions = {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
};

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {},
): boolean {
    const getMatches = (query: string): boolean => {
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query);
        }
        return defaultValue;
    });

    function handleChange() {
        setMatches(getMatches(query));
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query);
        // todo
        // handleChange();

        matchMedia.addEventListener('change', handleChange);
        return () => {
            matchMedia.addEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}
