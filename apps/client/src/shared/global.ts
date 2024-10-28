import { createGlobalStyle } from 'styled-components';
import './fonts/geist/geist.css';
import './reset.css';
import { transition } from './utils/styles/transition';
import { staticStyles } from './consts/styles/static';

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
        outline: 2px solid ${({ theme }) => theme.focusOutline};
        z-index: 999;
        outline-offset: 2px;
    }
    
    body {
        background-color: ${({ theme }) => theme.body.background};
        ${transition('background-color')};
        overflow: hidden;
    }

    ::-webkit-scrollbar {
        width: ${staticStyles.scrollbar.width};
    }
    
    ::-webkit-scrollbar-track {
        background-color: transparent; 

    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.scroll.thumb.background}; 
        border-radius: ${staticStyles.border.radius};
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.scroll.thumb.hover.background}; 
    }
`;
