import { ColorScheme } from './private/types';
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme extends ColorScheme {}
}
