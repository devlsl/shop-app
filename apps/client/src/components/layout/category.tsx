import styled, { css } from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { typography } from '../../shared/utils/styles/typography';
import { hover } from '../../shared/utils/styles/hover';
import { transition } from '../../shared/utils/styles/transition';

const Styled = styled.div`
    display: flex;
    gap: 8px;
    ${container()}
    align-self: center;
    padding: 6px 12px;
    color: ${({ theme }) => theme.input.placeholder};
    ${typography({ fontSize: '0.8rem', lineHeight: '1.2rem' })};
`;

const CategoryPathItem = styled.span`
    color: ${({ theme }) => theme.input.placeholder};

    ${hover(css`
        color: ${({ theme }) => theme.input.text};
    `)}

    cursor: pointer;
    ${transition('color')}
`;

const CategoryPathDivider = styled.span`
    color: ${({ theme }) => theme.input.placeholder};

    cursor: default;
    ${transition('color')}
`;

export const Category = () => {
    return (
        <Styled>
            <CategoryPathItem>...</CategoryPathItem>
            <CategoryPathDivider>{'/'}</CategoryPathDivider>
            <CategoryPathItem>Электроника</CategoryPathItem>
        </Styled>
    );
};
