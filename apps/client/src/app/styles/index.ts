import { createGlobalStyle } from 'styled-components';
import { resetStyles } from './reset';
import { scrollbarStyles } from './scrollbar';
import { outlineStyles } from './outline';
import { rootStyles } from './root';

export const GlobalStyles = createGlobalStyle`
    ${resetStyles}
    ${scrollbarStyles}
    ${outlineStyles}
    ${rootStyles}
`;
