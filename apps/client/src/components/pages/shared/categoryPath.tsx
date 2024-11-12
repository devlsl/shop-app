import styled, { css } from 'styled-components';
import { container } from '../../../shared/utils/styles/container';
import { typography } from '../../../shared/utils/styles/typography';
import { hover } from '../../../shared/utils/styles/hover';
import { transition } from '../../../shared/utils/styles/transition';
import { navigate, useSearchParam } from '../../../modules/url';
import { useApi } from '../../../hooks/useApi';
import React, { useEffect } from 'react';
import { Page } from '../../../shared/types/page';

const Styled = styled.div`
    ${container()}
    align-self: center;
    padding: 6px 0 0;
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

const CategoryPathItem = styled.button`
    color: ${({ theme }) => theme.categoryPath.text};

    ${hover(css`
        color: ${({ theme }) => theme.categoryPath.hover.text};
    `)}

    &:active {
        color: ${({ theme }) => theme.categoryPath.active.text};
    }
    &:disabled {
        color: ${({ theme }) => theme.categoryPath.active.text};
        cursor: default;
    }
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
    const categoryId = useSearchParam('categoryId') ?? null;
    const { call, cash, status } = useApi('getCategoryPath');

    useEffect(() => {
        if (status === 'loading') return;
        call({ categoryId });
    }, [categoryId]);

    return (
        <Styled>
            <Wrapper>
                <CategoryPathItem
                    disabled={categoryId === null}
                    onClick={() => navigate('/categories')}
                >
                    Категории
                </CategoryPathItem>
                {cash &&
                    cash.map((item) => (
                        <React.Fragment key={item.id}>
                            <CategoryPathDivider>{'/'}</CategoryPathDivider>
                            <CategoryPathItem
                                disabled={categoryId === item.id}
                                onClick={() =>
                                    navigate(
                                        ('/categories' satisfies Page) +
                                            `?categoryId=${item.id}`,
                                    )
                                }
                            >
                                {item.name}
                            </CategoryPathItem>
                        </React.Fragment>
                    ))}
            </Wrapper>
        </Styled>
    );
};