import 'styled-components';
import { darkColors } from './shared/consts/styles/colors/dark';

type Theme = typeof darkColors;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
