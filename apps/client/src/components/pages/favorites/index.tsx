import { PageLoader } from '../../pageLoader';
import { matchMediaBreakpoint } from '../../../features/breakpoints';
import { NotFoundPage } from '../shared/NotFoundPage';
import { apiPayloadSchemas, useApi } from '../../../features/api';
import { useEffect, useState } from 'react';
import { LazyLoadingTrigger, ProductsView } from '../products/productsGrid';
import { AuthNeedPage } from '../../../features/auth';
import { getUrlParam, useUrlParam } from '../../../features/url';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

export const parseProductFilters = () => {
    try {
        return apiPayloadSchemas.getProductsPageItems
            .required()
            .shape.filters.parse(JSON.parse(getUrlParam('filters') ?? ''));
    } catch (error) {
        return {};
    }
};

export const parseProductSorting = () => {
    try {
        return apiPayloadSchemas.getProductsPageItems
            .required()
            .shape.sort.parse(JSON.parse(getUrlParam('sorting') ?? ''));
    } catch (error) {
        return {};
    }
};

export const ProductsPageView = () => {
    const [lazyLoadElementRef, lazyLoadEntry] = useIntersectionObserver({
        threshold: 0,
    });

    const filters = useUrlParam('filters');
    const sorting = useUrlParam('sorting');
    const searchQuery = useUrlParam('search');

    const { cash, call, status } = useApi('getFavoritesPageItems');
    const [products, setProducts] = useState<NonNullable<typeof cash>['items']>(
        [],
    );
    const [allFetched, setAllFetched] = useState(false);

    const setFavoriteItemToState = (id: string, value: boolean) =>
        setProducts((prev) =>
            prev.map((i) => ({
                ...i,
                isLiked: i.id === id ? value : i.isLiked,
            })),
        );

    const fetchMoreProducts = async (fromStart: boolean = false) => {
        if (status === 'loading') return;

        const limit = matchMediaBreakpoint('oneColumnInContentGrid')
            ? 5
            : matchMediaBreakpoint('twoColumnsInContentGrid')
              ? 10
              : matchMediaBreakpoint('threeColumnsInContentGrid')
                ? 15
                : 20;
        const response = await call({
            startIndex: fromStart ? 0 : products.length,
            filters: parseProductFilters(),
            sort: parseProductSorting(),
            search: searchQuery,
            limit,
        });
        if (response.isLeft()) return;
        setProducts((prev) =>
            fromStart
                ? response.value.items
                : prev.concat(response.value.items),
        );
        setAllFetched(
            response.value.totalProductsCount ===
                (fromStart ? 0 : products.length) + response.value.items.length,
        );
    };

    useEffect(() => {
        fetchMoreProducts(true);
    }, [filters, sorting, searchQuery]);

    useEffect(() => {
        if (
            lazyLoadEntry !== null &&
            lazyLoadEntry.isIntersecting &&
            !allFetched
        )
            fetchMoreProducts();
    }, [lazyLoadEntry]);

    if (cash === null) return <PageLoader />;

    if (products.length === 0)
        return <NotFoundPage>Товаров нет 😢</NotFoundPage>;
    return (
        <>
            <ProductsView
                items={products}
                setFavoriteItemToState={setFavoriteItemToState}
            />
            {status === 'loading' && (
                <PageLoader size={'14px'} gap={'6px'} padding='80px 0' />
            )}
            <LazyLoadingTrigger ref={lazyLoadElementRef} />
        </>
    );
};

const FavoritesPage = () => (
    <AuthNeedPage>
        <ProductsPageView />
    </AuthNeedPage>
);

export default FavoritesPage;
