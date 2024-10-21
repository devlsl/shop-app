import { css, CSSProperties } from 'styled-components';

export const typographyCSS = (
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
    >,
) => {
    const {
        fontSize = '0.875rem',
        fontStyle = 'normal',
        fontWeight = '500',
        lineHeight = '1.25rem',
        textAlign = 'start',
        textDecoration = 'none',
        textTransform = 'none',
    } = props ?? {};
    return css`
        font-family: 'Geist', sans-serif;
        font-optical-sizing: auto;
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
        font-size: ${fontSize};
        line-height: ${lineHeight};
        text-align: ${textAlign};
        text-decoration: ${textDecoration};
        text-transform: ${textTransform};
    `;
};
