import { ThemeProvider } from 'styled-components';
import { useAuthorizeChecking } from '../hooks/useAuthorizeChecking';
import { useDeviceThemeListener, useTheme } from '../modules/theme';
import { usePopUrlStateListener } from '../modules/url';
import { Layout } from '../components/layout/layout';
import { GlobalStyles } from '../shared/global';
import { darkColors } from '../shared/consts/styles/colors/dark';
import { lightColors } from '../shared/consts/styles/colors/light';

export const Initial = () => {
    useAuthorizeChecking();
    usePopUrlStateListener();
    useDeviceThemeListener();

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme === 'dark' ? darkColors : lightColors}>
            <GlobalStyles />
            <Layout />;
        </ThemeProvider>
    );
};
