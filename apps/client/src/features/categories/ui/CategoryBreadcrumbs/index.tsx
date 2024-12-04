import styled, { css } from 'styled-components';
import { Link, useNavigationParam } from '../../../navigation';
import { container } from '../../../../shared/styles/container';
import React, { useEffect } from 'react';
import { useApi } from '../../../api';
import { transition } from '../../../../shared/styles/transition';
import { typography } from '../../../../shared/styles/typography';
import { hover } from '../../../../shared/styles/hover';

const needShowCategoryPath = (page: string) =>
    ['products', 'categories', 'product'].includes(page);

const Center = styled.div`
    ${container()}
    align-self: center;
    padding: 6px 8px 0;
`;

const Wrapper = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    padding-bottom: 6px;
    height: 100%;
    color: ${({ theme }) => theme.input.placeholder};
`;

const CategoryPathItem = styled(Link)<{ $disabled: boolean }>`
    color: ${({ theme }) => theme.categoryPath.text};

    ${hover(css`
        color: ${({ theme }) => theme.categoryPath.hover.text};
    `)}

    &:active {
        color: ${({ theme }) => theme.categoryPath.active.text};
    }
    ${({ $disabled }) =>
        $disabled &&
        css`
            color: ${({ theme }) => theme.categoryPath.active.text};
            cursor: default;
        `}

    ${typography({
        fontSize: '0.8rem',
        lineHeight: '1.2rem',
        fontWeight: 400,
    })};
    cursor: pointer;
    ${transition('color')}
`;

const CategoryPathDivider = styled.span`
    color: ${({ theme }) => theme.input.placeholder};
    ${typography({
        fontSize: '0.8rem',
        lineHeight: '1.2rem',
        fontWeight: 400,
    })};

    cursor: default;
    ${transition('color')}
`;

export const CategoryPath = () => {
    const categoryId = useNavigationParam('categoryId') ?? null;
    const { call, cash, status } = useApi('getCategoryPath');

    useEffect(() => {
        if (status === 'loading') return;
        call({ categoryId });
    }, [categoryId]);

    return (
        <Center>
            <Wrapper>
                <CategoryPathItem
                    $disabled={categoryId === null}
                    to={['categories']}
                >
                    Категории
                </CategoryPathItem>
                {cash &&
                    cash.map((item) => (
                        <React.Fragment key={item.id}>
                            <CategoryPathDivider>{'/'}</CategoryPathDivider>
                            <CategoryPathItem
                                $disabled={categoryId === item.id}
                                to={['categories', { categoryId: item.id }]}
                            >
                                {item.name}
                            </CategoryPathItem>
                        </React.Fragment>
                    ))}
            </Wrapper>
        </Center>
    );
};

export const CategoryBreadcrumbs = () => {
    const page = useNavigationParam('page') ?? '';

    return needShowCategoryPath(page) ? <CategoryPath /> : null;
};
