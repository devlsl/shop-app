import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const themes = ['dark', 'light'] as const;

type ThemeState = {
    theme: (typeof themes)[number];
};

export const useTheme = create(
    persist<ThemeState>(
        () => ({
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light',
        }),
        {
            name: 'theme',
        },
    ),
);
