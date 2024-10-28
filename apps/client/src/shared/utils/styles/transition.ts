import { css } from 'styled-components';
import { CSSProperties } from 'react';
import { ToKebabCase } from '../types/ToKebabCase';
import { staticStyles } from '../../consts/styles/static';

export const transition = (...props: ToKebabCase<keyof CSSProperties>[]) => css`
    transition-property: ${props.join(',')};
    transition-duration: ${staticStyles.transition.duration};
`;
