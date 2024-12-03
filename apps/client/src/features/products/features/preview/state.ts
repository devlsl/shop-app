import { create } from 'zustand';
import { PreviewState } from './types';

export const usePreviewState = create<PreviewState>(() => ({
    shownProductId: null,
}));
