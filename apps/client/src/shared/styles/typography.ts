import { css, CSSProperties } from 'styled-components';

export const typography = (
    props?: Pick<
        CSSProperties,
        | 'fontSize'
        | 'fontStyle'
        | 'fontWeight'
        | 'fontSize'
        | 'lineHeight'
        | 'textDecoration'
        | 'textTransform'
        | 'textAlign'
        | 'letterSpacing'
        | 'wordSpacing'
    >,
) => {
    const {
        wordSpacing = 'normal',
        fontSize = '1rem',
        letterSpacing = 'normal',
        fontStyle = 'normal',
        fontWeight = '500',
        lineHeight = '1.5rem',
        textAlign = 'start',
        textDecoration = 'none',
        textTransform = 'none',
    } = props ?? {};
    return css`
        font-family: 'Montserrat', serif;
        font-optical-sizing: auto;
        letter-spacing: ${letterSpacing};
        word-spacing: ${wordSpacing};
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
        font-size: ${fontSize};
        line-height: ${lineHeight};
        text-align: ${textAlign};
        text-decoration: ${textDecoration};
        text-transform: ${textTransform};
    `;
};
