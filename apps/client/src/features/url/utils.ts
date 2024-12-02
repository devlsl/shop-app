import { z } from 'zod';
import { Page, UrlState } from './types';
import { useUrlState } from './state';
import { getUrlParam } from './selectors';
import { publicPages } from './consts/publicPages';

export const getCurrentUrlState = () => {
    const params = new URLSearchParams(window.location.search).get(
        __APP_ENV__.CLIENT_URL_PARAMS_KEY,
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

export const getHrefFromUrlState = (state: UrlState['params']) => {
    const url = new URL(window.location.href);
    url.searchParams.set(
        __APP_ENV__.CLIENT_URL_PARAMS_KEY,
        JSON.stringify(state),
    );
    return url.href;
};

export const getNextUrlState = (
    entries: Record<string, string | undefined | null>,
    deleteOtherParams: boolean = false,
): UrlState['params'] => {
    const prevState = useUrlState.getState().params;

    if (deleteOtherParams) {
        return Object.fromEntries(
            Object.entries(entries).filter(
                ([_, value]) => value !== undefined && value !== null,
            ),
        ) as UrlState['params'];
    }

    const entriesKeys: Record<string, string | undefined> = Object.fromEntries(
        Object.keys(entries).map((key) => [key, key]),
    );

    return Object.fromEntries(
        Object.entries(prevState)
            .map(([k, v]) => [k, entriesKeys[k] !== undefined ? entries[k] : v])
            .concat(Object.entries(entries))
            .filter(([_, v]) => v !== undefined && v !== null),
    ) as UrlState['params'];
};

export const isCurrentPagePublic = () =>
    publicPages.includes((getUrlParam('page') ?? '') as Page);

export const isCurrentPagePrivate = () =>
    !publicPages.includes((getUrlParam('page') ?? '') as Page);
