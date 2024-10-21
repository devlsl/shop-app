import { usePopStateHandlingEffect } from '../modules/url';
import { useDeviceThemeEffect, useTheme } from '../modules/theme';
import { Layout } from './layout/layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles';

export const App = () => {
    usePopStateHandlingEffect();
    useDeviceThemeEffect();
    const theme = useTheme();
    return (
        <ThemeProvider
            theme={{
                isDark: theme === 'dark',
                isLight: theme === 'light',
                value: theme,
            }}
        >
            <GlobalStyles />
            <Layout />
        </ThemeProvider>
    );
};
