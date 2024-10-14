import { AuthContext } from 'ts-api-generator';
import { create } from 'zustand';

type UserState = {
    // null - unauthorized , undefined - unchecked , AuthContext - authorized
    user: AuthContext | null | undefined;
};

export const useUser = create<UserState>(() => ({
    user: undefined,
}));
