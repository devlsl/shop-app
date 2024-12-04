import { z } from 'zod';
import { NavigationState, Page } from './types';
import { useNavigationState } from './state';
import { publicPages } from './consts/publicPages';
import { getNavigationParam } from './selectors';

export const getCurrentNavigationState = () => {
    const params = new URLSearchParams(window.location.search).get(
        __APP_ENV__.CLIENT_NAVIGATION_PARAMS_KEY,
    );
    if (params === null) return {};
    try {
        return z
            .record(z.string(), z.string().optional())
            .parse(JSON.parse(params));
    } catch {
        return {};
    }
};

export const calcHrefByNavigationState = (state: NavigationState['params']) => {
    const url = new URL(window.location.href);
    url.searchParams.set(
        __APP_ENV__.CLIENT_NAVIGATION_PARAMS_KEY,
        JSON.stringify(state),
    );
    return url.href;
};

export const calcNextNavigationState = (
    entries: Record<string, string | undefined | null>,
    deleteOtherParams: boolean = false,
): NavigationState['params'] => {
    const prevState = useNavigationState.getState().params;

    if (deleteOtherParams) {
        return Object.fromEntries(
            Object.entries(entries).filter(
                ([_, value]) => value !== undefined && value !== null,
            ),
        ) as NavigationState['params'];
    }

    const entriesKeys: Record<string, string | undefined> = Object.fromEntries(
        Object.keys(entries).map((key) => [key, key]),
    );

    return Object.fromEntries(
        Object.entries(prevState)
            .map(([k, v]) => [k, entriesKeys[k] !== undefined ? entries[k] : v])
            .concat(Object.entries(entries))
            .filter(([_, v]) => v !== undefined && v !== null),
    ) as NavigationState['params'];
};

export const isCurrentPagePublic = () =>
    publicPages.includes((getNavigationParam('page') ?? '') as Page);

export const isCurrentPagePrivate = () =>
    !publicPages.includes((getNavigationParam('page') ?? '') as Page);
