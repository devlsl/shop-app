import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        isDark: boolean;
        isLight: boolean;
        value: 'dark' | 'light';
    }
}
