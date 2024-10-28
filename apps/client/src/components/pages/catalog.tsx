import styled, { css } from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { transition } from '../../shared/utils/styles/transition';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';

const Catalog = styled.div`
    ${container()}
    display: grid;
    gap: 8px;
    /* overflow-y: visible; */

    padding: 0 8px 0 0;
    /* border: 1px solid red; */
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
    height: fit-content;
    /* align-self: start; */
`;

const CatalogItem = styled.div`
    border-radius: 8px;
    /* border: 1px solid transparent; */
    background-color: ${({ theme }) => theme.button.secondary.background};
    /* height: 250px; */
    width: 100%;
    ${transition('background-color')}
    aspect-ratio: 1;
`;

const catalogItems = [
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20,
];

export const CatalogPage = () => {
    return (
        <Catalog>
            {catalogItems.map((i) => (
                <CatalogItem />
            ))}
        </Catalog>
    );
};
