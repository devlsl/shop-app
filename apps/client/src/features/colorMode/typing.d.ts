import { ColorScheme } from './types';
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme extends ColorScheme {}
}
