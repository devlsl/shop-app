import { ThemeProvider } from 'styled-components';
import { useDeviceColorModeListener } from '../hooks';
import { colorSchemes } from '../consts/schemes';
import { useColorMode } from '../selectors';

export const ColorModeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    useDeviceColorModeListener();

    const colorMode = useColorMode();

    return (
        <ThemeProvider theme={colorSchemes[colorMode]}>
            {children}
        </ThemeProvider>
    );
};
