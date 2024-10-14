import { create } from 'zustand';

type AppState = {
    errors: string[];
    showSignInView: boolean;
};

export const useAppState = create<AppState>(() => ({
    errors: [],
    showSignInView: false,
}));
