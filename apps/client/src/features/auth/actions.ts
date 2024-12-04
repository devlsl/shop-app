import { useAuthState } from './state';
import { AuthState } from './types';

export const setUser = (user: AuthState['user']) =>
    useAuthState.setState((prev) => ({
        ...prev,
        ...(user === null
            ? { user, status: 'unauthorized' }
            : user === undefined
              ? { user, status: 'checking' }
              : { user, status: 'authorized' }),
    }));

export const showSignInPopup = () =>
    useAuthState.setState({
        isShownSignInPopup: true,
    });

export const hideSignInPopup = () =>
    useAuthState.setState({
        isShownSignInPopup: false,
    });
