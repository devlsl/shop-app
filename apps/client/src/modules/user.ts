import { AuthContext } from 'ts-api-generator';
import { create } from 'zustand';

type UserState = {
    // null - unauthorized , undefined - unchecked , AuthContext - authorized
    user: AuthContext | null | undefined;
};

const useUserState = create<UserState>(() => ({
    user: undefined,
}));

export const setUser = (user: AuthContext | null | undefined) =>
    useUserState.setState({ user });

export const getUser = () => useUserState.getState().user;

export const useUser = () => useUserState((state) => state.user);
