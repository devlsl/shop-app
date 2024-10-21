import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const themes = ['dark', 'light'] as const;

type ThemeState = {
    theme: (typeof themes)[number];
};

const useThemeState = create(
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

const setThemeState = useThemeState.setState;

export const getThemeState = useThemeState.getState;

export const useTheme = () => useThemeState((state) => state.theme);

export const toggleTheme = () =>
    setThemeState((prev) => ({
        ...prev,
        theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));

export const useDeviceThemeEffect = () => {
    useEffect(() => {
        const handler = (ev: MediaQueryListEvent) =>
            setThemeState({ theme: ev.matches ? 'dark' : 'light' });
        const darkSchemeMediaMatcher = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );
        darkSchemeMediaMatcher.addEventListener('change', handler);
        return () =>
            darkSchemeMediaMatcher.removeEventListener('change', handler);
    }, []);
};
