import { isDeepEqual } from '../../shared/helpers/isDeepEqual';
import { useNavigationState } from './state';
import { Page } from './types';
import { calcNextNavigationState } from './utils';

export const setNavigationParams = (
    entries: Record<string, string | undefined | null>,
    deleteOtherParams: boolean = false,
    pushToHistory: boolean = true,
) => {
    const prevState = useNavigationState.getState().params;
    const nextState = calcNextNavigationState(entries, deleteOtherParams);
    if (isDeepEqual(prevState, nextState)) return;
    useNavigationState.setState(() => ({ params: nextState }));
    const jsonNextState = JSON.stringify(nextState);
    const url = new URL(window.location.href);
    url.searchParams.set(
        __APP_ENV__.CLIENT_NAVIGATION_PARAMS_KEY,
        jsonNextState,
    );
    history[pushToHistory ? 'pushState' : 'replaceState'](
        jsonNextState,
        '',
        url,
    );
};

export const setNavigationParam = (
    key: string,
    value: string | undefined | null,
    deleteOtherParams: boolean = false,
    pushToHistory: boolean = true,
) => setNavigationParams({ [key]: value }, deleteOtherParams, pushToHistory);

export const navigate = (
    page: Page,
    entries: Record<string, string | undefined | null> = {},
) => setNavigationParams({ page, ...entries }, true);
