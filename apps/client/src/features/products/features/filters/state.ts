import { create } from 'zustand';
import { FiltersState } from './types';

export const useFiltersState = create<FiltersState>(() => ({
    areShown: false,
}));
