import { useColorModeState } from './state';

export const toggleColorMode = () =>
    useColorModeState.setState((prev) => ({
        ...prev,
        theme: prev.value === 'dark' ? 'light' : 'dark',
    }));
