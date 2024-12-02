import { useUrlState } from './state';

export const useUrlParam = (key: string) =>
    useUrlState((state) => state.params[key]);

export const getUrlParam = (key: string) => useUrlState.getState().params[key];
