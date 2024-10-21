import { createGlobalStyle } from 'styled-components';
import { staticTheme } from './static';
import './fonts.css';
import './reset.css';

export const GlobalStyles = createGlobalStyle`
    a,
    button,
    input,
    textarea,
    select {
        outline-color: transparent;
    }

    a:focus-visible,
    button:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
        outline: 2px solid ${staticTheme.outline.color};
        outline-offset: 2px;
    }
`;
