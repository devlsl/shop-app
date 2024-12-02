import { create } from 'zustand';
import { AuthState } from './types';

export const useAuthState = create<AuthState>(() => ({
    user: undefined,
    status: 'checking',
    isShownSignInPopup: false,
}));
