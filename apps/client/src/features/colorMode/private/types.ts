import { colorModes } from './consts/modes';
import { darkColors } from './consts/schemes/dark';

export type ColorMode = (typeof colorModes)[number];

export type ColorScheme = typeof darkColors;
