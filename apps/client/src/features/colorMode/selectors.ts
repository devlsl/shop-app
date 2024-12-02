import { useColorModeState } from './state';

export const useColorMode = () => useColorModeState((state) => state.value);
