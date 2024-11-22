import { AuthContext } from 'ts-api-generator';
import { create } from 'zustand';

type UserState =
    | {
          status: 'checking';
          user: undefined;
      }
    | {
          status: 'unauthorized';
          user: null;
      }
    | {
          status: 'authorized';
          user: AuthContext;
      };

const useUserState = create<UserState>(() => ({
    user: undefined,
    status: 'checking',
}));

export const setUser = (user: AuthContext | null | undefined) =>
    useUserState.setState(
        user === null
            ? { user, status: 'unauthorized' }
            : user === undefined
              ? { user, status: 'checking' }
              : { user, status: 'authorized' },
    );

export const getUser = () => useUserState.getState().user;

export const useUser = () => useUserState((state) => state.user);

export const useIsAuthorized = () =>
    useUserState((state) => state.user !== null && state.user !== undefined);

export const useAuthStatus = () => useUserState((state) => state.status);
