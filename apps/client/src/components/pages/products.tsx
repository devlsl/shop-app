import styled, { css } from 'styled-components';
import { navigate, useSearchParam } from '../../modules/url';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { PageLoader } from '../pageLoader';
import { Page } from '../../shared/types/page';
import { typography } from '../../shared/utils/styles/typography';
import { CardsGrid } from './shared/cardsGrid';
import { Card } from './shared/card';
import { TextButton } from '../buttons/textButton';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { breakpoints } from '../../shared/consts/breakpoints';
import { breakpointToMedia } from '../../shared/utils/helpers/breakpointToMedia';
import { matchMediaBreakpoint } from '../../shared/utils/helpers/isBreakpointMathers';
import { Loader } from '../loader';
import { transition } from '../../shared/utils/styles/transition';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';

const Styled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    /* border: 1px solid red; */
`;

const Center = styled(Styled)`
    justify-content: center;
    align-items: center;
`;

const StyledProductsNotFoundPage = styled(Center)`
    color: ${({ theme }) => theme.button.secondary.text};
    ${typography({ fontSize: '1.4rem', lineHeight: '2.1rem' })}
`;

const ProductsNotFoundPage = () => {
    return (
        <StyledProductsNotFoundPage>
            Товаров нет &#x1F622;
        </StyledProductsNotFoundPage>
    );
};

const TitleWrapper = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
    flex-direction: column;
`;

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
export const ProductsPage = () => {
    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
        rootMargin: '20%',
    });

    const categoryId = useSearchParam('categoryId') ?? null;
    const { cash, call, status } = useApi('getProductsForProductPage');

    const [products, setProducts] = useState<NonNullable<typeof cash>['items']>(
        [],
    );

    const fetchMoreProducts = async () => {
        if (status === 'loading') return;

        const limit = matchMediaBreakpoint('oneColumnInContentGrid')
            ? 5
            : matchMediaBreakpoint('twoColumnsInContentGrid')
              ? 10
              : matchMediaBreakpoint('threeColumnsInContentGrid')
                ? 15
                : 20;
        const response = await call({
            categoryId: categoryId,
            startIndex: products.length,
            limit,
        });
        if (response.isLeft()) return;
        setProducts((prev) => prev.concat(response.value.items));
    };

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    useEffect(() => {
        if (entry !== null && entry.isIntersecting) fetchMoreProducts();
    }, [entry]);

    if (categoryId === null) {
        return navigate('/categories' satisfies Page);
    }

    if (cash === null) return <PageLoader />;

    if (products.length === 0) return <ProductsNotFoundPage />;

    return (
        <>
            <CardsGrid>
                {products.map((item) => (
                    <Card
                        imageUrlOrSlot={item.miniatures[0].url}
                        key={item.id}
                        onClick={() => console.log('product')}
                        aspectRatio='2/3'
                    >
                        <TitleWrapper>
                            <TitleLine>{item.name}</TitleLine>
                        </TitleWrapper>
                    </Card>
                ))}
            </CardsGrid>
            {status === 'loading' && (
                <PageLoader size={'14px'} gap={'6px'} padding='80px 0' />
            )}
            <div ref={ref} />
        </>
    );
};
