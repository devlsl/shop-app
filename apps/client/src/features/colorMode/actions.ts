import { useColorModeState } from './state';

export const toggleColorMode = () =>
    useColorModeState.setState((prev) => ({
        ...prev,
        value: prev.value === 'dark' ? 'light' : 'dark',
    }));
