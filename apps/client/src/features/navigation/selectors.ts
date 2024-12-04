import { useNavigationState } from './state';

export const useNavigationParam = (key: string) =>
    useNavigationState((state) => state.params[key]);

export const getNavigationParam = (key: string) =>
    useNavigationState.getState().params[key];
