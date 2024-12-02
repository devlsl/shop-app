import styled, { css } from 'styled-components';
import { breakpoint } from '../../../features/breakpoints';
import { container } from '../../../shared/styles/container';

export const CardsGrid = styled.div`
    ${container()}
    display: grid;

    gap: 8px;
    grid-template-columns: repeat(4, 1fr);
    ${breakpoint(
        'threeColumnsInContentGrid',
        css`
            grid-template-columns: repeat(3, 1fr);
        `,
    )}
    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            grid-template-columns: repeat(2, 1fr);
        `,
    )}
    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            grid-template-columns: repeat(1, 1fr);
        `,
    )}
`;
