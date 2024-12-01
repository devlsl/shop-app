import { ColorMode, ColorScheme } from '../../../public/types';
import { darkColors } from './dark';
import { lightColors } from './light';

export const colorSchemes: Record<ColorMode, ColorScheme> = {
    dark: darkColors,
    light: lightColors,
};
