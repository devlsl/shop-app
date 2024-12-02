import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorModeState } from './types';

export const useColorModeState = create(
    persist<ColorModeState>(
        () => ({
            value: window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light',
        }),
        {
            name: 'colorMode',
        },
    ),
);
