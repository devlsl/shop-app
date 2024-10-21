import { css } from 'styled-components';
import { CSSProperties } from 'react';
import { ToKebabCase } from './ToKebabCase';
import { staticTheme } from '../app/styles/static';

export const animate = (...props: ToKebabCase<keyof CSSProperties>[]) => css`
    transition-property: ${props.join(',')};
    transition-duration: ${staticTheme.transition.duration};
`;
