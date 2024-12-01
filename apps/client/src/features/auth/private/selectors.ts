import { useAuthState } from './state';

export const useIsAuthorized = () =>
    useAuthState((state) => state.user !== null && state.user !== undefined);

export const useAuthStatus = () => useAuthState((state) => state.status);

export const useIsShownSignInPopup = () =>
    useAuthState((state) => state.isShownSignInPopup);
