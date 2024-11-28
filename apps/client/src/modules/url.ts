import { useEffect } from 'react';
import { z } from 'zod';
import { create } from 'zustand';
import { isDeepEqual } from '../shared/utils/helpers/isDeepEqual';

type UrlState = { params: Record<string, string | undefined> };

const getCurrentUrlState = () => {
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

const useUrlState = create<UrlState>(() => ({
    params: getCurrentUrlState(),
}));

export const useUrlParam = (key: string) =>
    useUrlState((state) => state.params[key]);

export const getUrlParam = (key: string) => useUrlState.getState().params[key];

export const setUrlParam = (
    key: string,
    value: string | undefined | null,
    deleteOtherParams: boolean = false,
    pushToHistory: boolean = true,
) => {
    const prevState = useUrlState.getState().params;
    const nextState = getNextUrlState({[key]: value}, deleteOtherParams);
    if (isDeepEqual(prevState, nextState)) return;
    useUrlState.setState(() => ({ params: nextState }));
    const jsonNextState = JSON.stringify(nextState);
    const url = new URL(window.location.href);
    url.searchParams.set(__APP_ENV__.CLIENT_URL_PARAMS_KEY, jsonNextState);
    history[pushToHistory ? 'pushState' : 'replaceState'](
        jsonNextState,
        '',
        url,
    );
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
            .filter(([_, v]) => v !== undefined || v !== null),
    ) as UrlState['params'];
};

export const setUrlParams = (
    entries: Record<string, string | undefined | null>,
    deleteOtherParams: boolean = false,
    pushToHistory: boolean = true,
) => {
    const prevState = useUrlState.getState().params;
    const nextState = getNextUrlState(entries, deleteOtherParams);
    if (isDeepEqual(prevState, nextState)) return;
    useUrlState.setState(() => ({ params: nextState }));
    const jsonNextState = JSON.stringify(nextState);
    const url = new URL(window.location.href);
    url.searchParams.set(__APP_ENV__.CLIENT_URL_PARAMS_KEY, jsonNextState);
    history[pushToHistory ? 'pushState' : 'replaceState'](
        jsonNextState,
        '',
        url,
    );
};

export const usePopUrlStateListener = () => {
    useEffect(() => {
        const handle = () => {
            const prevState = useUrlState.getState().params;
            const nextState = getCurrentUrlState();
            if (!isDeepEqual(prevState, nextState))
                useUrlState.setState(() => ({ params: nextState }));
        };
        window.addEventListener('popstate', handle);
        return () => window.removeEventListener('popstate', handle);
    }, []);
};
