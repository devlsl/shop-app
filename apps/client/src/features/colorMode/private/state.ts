import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorMode } from './types';

type ColorModeState = {
    value: ColorMode;
};

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
