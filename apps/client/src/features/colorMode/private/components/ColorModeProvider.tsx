import { ThemeProvider } from "styled-components";
import { useColorMode, useDeviceColorModeListener } from "../hooks";
import { colorSchemes } from "../consts/schemes";

export const ColorModeProvider = ({children}:{children: React.ReactNode}) => {
    useDeviceColorModeListener();

    const colorMode = useColorMode();

    return (
        <ThemeProvider theme={colorSchemes[colorMode]}>
            {children}
        </ThemeProvider>
    );
};
