import { css } from 'styled-components';
import { staticStyles } from '../../consts/styles/static';

export const container = () => css`
    max-width: ${staticStyles.container.maxWidth};
    width: 100%;
`;
