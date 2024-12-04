import { create } from 'zustand';
import { NavigationState } from './types';
import { getCurrentNavigationState } from './utils';

export const useNavigationState = create<NavigationState>(() => ({
    params: getCurrentNavigationState(),
}));
