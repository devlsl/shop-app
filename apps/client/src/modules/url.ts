import { useEffect } from 'react';
import { create } from 'zustand';

type UrlState = {
    pathname: string;
    searchParams: Record<string, string | undefined>;
    hash: string;
};

const useUrlState = create<UrlState>(() => ({
    pathname: window.location.pathname,
    searchParams: Object.fromEntries(
        new URL(window.location.href).searchParams.entries(),
    ),
    hash: window.location.hash.slice(1),
}));

const setUrlState = useUrlState.setState;

export const getUrlState = useUrlState.getState;

export const usePathname = () => useUrlState((state) => state.pathname);
export const useHash = () => useUrlState((state) => state.hash);
export const useSearchParams = () => useUrlState((state) => state.searchParams);
export const useSearchParam = (key: string) =>
    useUrlState((state) => state.searchParams[key]);

export const setSearchParams = (
    params: { key: string; value: string | null }[],
    replace: boolean = false,
) =>
    setUrlState((prev) => {
        const url = new URL(window.location.href);

        let hasChanges = false;

        params.forEach(({ key, value }) => {
            if (prev.searchParams[key] !== value) hasChanges = true;
            if (value === null) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }
        });

        if (!hasChanges) return prev;

        const historyUpdateFn = replace ? 'replaceState' : 'pushState';
        history[historyUpdateFn](url.href, '', url.href);

        return {
            ...prev,
            searchParams: Object.fromEntries(url.searchParams.entries()),
        };
    });

export const setSearchParam = (
    key: string,
    value: string | null,
    replace: boolean = false,
) =>
    setUrlState((prev) => {
        if (prev.searchParams[key] === value) return prev;
        const url = new URL(window.location.href);

        if (value === null) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value);
        }

        const historyUpdateFn = replace ? 'replaceState' : 'pushState';
        history[historyUpdateFn](url.href, '', url.href);

        return {
            ...prev,
            searchParams: Object.fromEntries(url.searchParams.entries()),
        };
    });

export const setHash = (
    arg: ((prev: string) => string) | string,
    replace: boolean = false,
) =>
    setUrlState((prev) => {
        const nextHash = (
            typeof arg === 'function' ? arg(window.location.hash) : arg
        ).replace(/#/g, '');

        if (nextHash === prev.hash) return prev;

        const historyUpdateFn = replace ? 'replaceState' : 'pushState';
        const url = new URL(window.location.href);
        url.hash = nextHash;
        history[historyUpdateFn](url.href, '', url.href);

        return {
            ...prev,
            hash: nextHash,
        };
    });

export const navigate = (to: string, replace: boolean = false) =>
    setUrlState((prev) => {
        const prevHref = window.location.href;
        const prevUrl = new URL(prevHref);
        const nextHref =
            to.charAt(0) !== '/'
                ? prevUrl.origin
                      .concat(prevUrl.pathname)
                      .split('/')
                      .slice(0, -1)
                      .concat(to)
                      .join('/')
                : prevUrl.origin.concat(to);

        if (nextHref === prevHref) return prev;
        const nextUrl = new URL(nextHref);

        const historyUpdateFn = replace ? 'replaceState' : 'pushState';
        history[historyUpdateFn](nextHref, '', nextHref);

        return {
            ...prev,
            pathname: nextUrl.pathname,
            searchParams: Object.fromEntries(nextUrl.searchParams.entries()),
            hash: nextUrl.hash.replace(/#/g, ''),
        };
    });

export const usePopStateHandlingEffect = () => {
    useEffect(() => {
        const handle = () => {
            const href = window.location.href;
            const url = new URL(href);
            setUrlState({
                pathname: url.pathname,
                searchParams: Object.fromEntries(url.searchParams.entries()),
                hash: url.hash.slice(1),
            });
        };
        window.addEventListener('popstate', handle);
        return () => window.removeEventListener('popstate', handle);
    }, []);
};
