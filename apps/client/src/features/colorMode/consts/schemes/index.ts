import { ColorMode, ColorScheme } from '../../types';
import { darkColors } from './dark';
import { lightColors } from './light';

export const colorSchemes: Record<ColorMode, ColorScheme> = {
    dark: darkColors,
    light: lightColors,
};
