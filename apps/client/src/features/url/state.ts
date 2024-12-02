import { create } from 'zustand';
import { UrlState } from './types';
import { getCurrentUrlState } from './utils';

export const useUrlState = create<UrlState>(() => ({
    params: getCurrentUrlState(),
}));
