import styled, { css } from 'styled-components';
import { breakpoint } from '../../../features/breakpoints';
import { useEffect } from 'react';
import { ChevronLeftIcon, TextSearchIcon } from 'lucide-react';
import { PageLoader } from '../../pageLoader';
import { Card } from '../shared/card';
import { CardsGrid } from '../shared/cardsGrid';
import { useUrlParam } from '../../../features/url';
import { useApi } from '../../../features/api';
import { typography } from '../../../shared/styles/typography';
import { transition } from '../../../shared/styles/transition';

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

const CategoriesPage = () => {
    const categoryId = useUrlParam('categoryId') ?? null;

    const searchQuery = useUrlParam('search');

    const { call, cash, status } = useApi('getCategoriesPageItems');

    useEffect(() => {
        if (status === 'loading') return;
        const a = call({ categoryId });
        a.then(w => {
            if (w.isRight()) {
            const qw = w.value
            }
        })
    }, [categoryId]);

    if (cash === null) return <PageLoader />;

    if (status === 'error') return <Center>Такой категории нет 😢</Center>;

    let items = cash.items;

    if (searchQuery) {
        items = items.filter((i) =>
            i.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }

    return (
        <CardsGrid>
            {cash.backCategoryId !== undefined ? (
                <Card
                    to={['categories', { categoryId: cash.backCategoryId }]}
                    aspectRatio='1'
                    imageUrlOrSlot={<ChevronLeftIcon width='50%' />}
                />
            ) : null}
            {cash.haveProducts && (
                <Card
                    aspectRatio='1'
                    imageUrlOrSlot={<TextSearchIcon width='50%' />}
                    to={['products', { categoryId: cash.id }]}
                >
                    <TitleWrapper>
                        <TitleLine>Товары</TitleLine>
                        <TitleLine>этой категории</TitleLine>
                    </TitleWrapper>
                </Card>
            )}
            {items.map((item) => (
                <Card
                    aspectRatio='1'
                    imageUrlOrSlot={item.imageUrl}
                    key={item.id}
                    to={[
                        item.haveNestedCategories ? 'categories' : 'products',
                        {
                            categoryId: item.id,
                        },
                    ]}
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

export default CategoriesPage;
