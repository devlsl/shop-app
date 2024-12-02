import { useEffect } from 'react';
import { useColorModeState } from './state';

export const useDeviceColorModeListener = () => {
    useEffect(() => {
        const handler = (ev: MediaQueryListEvent) =>
            useColorModeState.setState({
                value: ev.matches ? 'dark' : 'light',
            });
        const darkModeMediaMatcher = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );
        darkModeMediaMatcher.addEventListener('change', handler);
        return () =>
            darkModeMediaMatcher.removeEventListener('change', handler);
    }, []);
};
