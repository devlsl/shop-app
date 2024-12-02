import { isDeepEqual } from '../../shared/helpers/isDeepEqual';
import { useUrlState } from './state';
import { Page } from './types';
import { getNextUrlState } from './utils';

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

export const navigate = (
    page: Page,
    entries: Record<string, string | undefined | null> = {},
) => setUrlParams({ page, ...entries }, true);

export const setUrlParam = (
    key: string,
    value: string | undefined | null,
    deleteOtherParams: boolean = false,
    pushToHistory: boolean = true,
) => setUrlParams({ [key]: value }, deleteOtherParams, pushToHistory);
