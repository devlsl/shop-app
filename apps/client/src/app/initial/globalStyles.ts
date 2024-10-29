import { createGlobalStyle } from 'styled-components';
import './reset.css';
import { transition } from '../../shared/utils/styles/transition';
import { staticStyles } from '../../shared/consts/styles/static';

export const GlobalStyles = createGlobalStyle`
    div,
    a,
    button,
    input,
    textarea,
    select {
        outline-color: transparent;
    }

    div:focus-visible,
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
        
    }
 
    html, body, #root {
        min-height: 100%;
        height: 100%;
        overflow: hidden;
    }

    ::-webkit-scrollbar {
        width: ${staticStyles.scrollbar.size};
        height: ${staticStyles.scrollbar.size};
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
