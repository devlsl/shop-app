import { ThemeProvider } from 'styled-components';
import { useDeviceThemeListener, useTheme } from '../../modules/theme';
import { usePopUrlStateListener } from '../../modules/url';
import { useAuthorizeChecking } from '../../hooks/useAuthorizeChecking';
import { darkColors } from '../../shared/consts/styles/colors/dark';
import { lightColors } from '../../shared/consts/styles/colors/light';
import { GlobalStyles } from './globalStyles';
import { Layout } from '../../components/layout';

export const Initial = () => {
    useAuthorizeChecking();
    usePopUrlStateListener();
    useDeviceThemeListener();

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme === 'dark' ? darkColors : lightColors}>
            <GlobalStyles />
            <Layout />
        </ThemeProvider>
    );
};
