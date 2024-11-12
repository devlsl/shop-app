import styled, { css } from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { transition } from '../../shared/utils/styles/transition';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';
import { typography } from '../../shared/utils/styles/typography';
import { useEffect } from 'react';
import { navigate, setSearchParam, useSearchParam } from '../../modules/url';
import { useApi } from '../../hooks/useApi';
import { ChevronLeftIcon, TextSearchIcon } from 'lucide-react';
import { PageLoader } from '../pageLoader';
import { Page } from '../../shared/types/page';
import { Card } from './shared/card';
import { CardsGrid } from './shared/cardsGrid';

const TitleLine = styled.div`
    ${typography({
        fontWeight: 600,
        fontSize: '0.85rem',
        lineHeight: '0.85rem',
    })}
    max-width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    overflow-wrap: break-word;
    overflow: hidden;

    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            font-size: 1rem;
            line-height: 1rem;
        `,
    )}

    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            font-size: 1.3rem;
            line-height: 1.3rem;
        `,
    )}

    color: ${({ theme }) => theme.button.secondary.text};

    ${transition('color')}
`;

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${typography({ fontSize: '1.4rem', lineHeight: '2.1rem' })}

    color: ${({ theme }) => theme.button.secondary.text};
`;

const TitleWrapper = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
    flex-direction: column;
`;

export const CategoriesPage = () => {
    const categoryId = useSearchParam('categoryId') ?? null;

    const { call, cash, status } = useApi('getCategoriesPageData');

    useEffect(() => {
        if (status === 'loading') return;
        call({ categoryId });
    }, [categoryId]);

    if (cash === null) return <PageLoader />;

    if (status === 'error')
        return <Center>Такой категории нет &#x1F622;</Center>;

    return (
        <CardsGrid>
            {cash.backCategoryId !== undefined ? (
                <Card
                    imageUrlOrSlot={<ChevronLeftIcon width='50%' />}
                    onClick={() =>
                        setSearchParam(
                            'categoryId',
                            cash.backCategoryId ?? null,
                        )
                    }
                />
            ) : null}
            {cash.haveProducts && (
                <Card
                    imageUrlOrSlot={<TextSearchIcon width='50%' />}
                    onClick={() =>
                        navigate(
                            ('/products' satisfies Page) +
                                `?categoryId=${cash.id}`,
                        )
                    }
                >
                    <TitleWrapper>
                        <TitleLine>Товары</TitleLine>
                        <TitleLine>этой категории</TitleLine>
                    </TitleWrapper>
                </Card>
            )}
            {cash.items.map((item) => (
                <Card
                    imageUrlOrSlot={item.imageUrl}
                    key={item.id}
                    onClick={() =>
                        item.haveNestedCategories
                            ? setSearchParam('categoryId', item.id)
                            : navigate(
                                  ('/products' satisfies Page) +
                                      `?categoryId=${item.id}`,
                              )
                    }
                >
                    <TitleWrapper>
                        {item.name
                            .split('\n')
                            .slice(0, 2)
                            .map((phrase, i) => (
                                <TitleLine key={i}>{phrase}</TitleLine>
                            ))}
                    </TitleWrapper>
                </Card>
            ))}
        </CardsGrid>
    );
};
