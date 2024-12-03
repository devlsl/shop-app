import { AuthDependentView } from '../../../../auth';
import { useEffect, useState } from 'react';
import { matchMediaBreakpoint } from '../../../../breakpoints';
import { LazyLoadingTrigger, ProductsView } from './ProductsGrid';
import {
    parseProductFilters,
    parseProductSorting,
} from '../../../../../pages/favorites';
import { useUrlParam } from '../../../../url';
import { useApi } from '../../../../api';
import { useIntersectionObserver } from '../../../../../shared/hooks/useIntersectionObserver';
import { NotFoundPage } from '../../../../../pages/shared/NotFoundPage';
import { PageLoader } from '../../../../../shared/ui/PageLoader';

export const ProductsPageView = ({
    isAuthorized = false,
}: {
    isAuthorized?: boolean;
}) => {
    const [lazyLoadElementRef, lazyLoadEntry] = useIntersectionObserver({
        threshold: 0,
    });
    const categoryId = useUrlParam('categoryId') ?? null;

    const filters = useUrlParam('filters');
    const sorting = useUrlParam('sorting');
    const searchQuery = useUrlParam('search');

    const { cash, call, status } = useApi(
        isAuthorized ? 'getProductsPageItems' : 'getProductsPageItemsForGuest',
    );
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
            categoryId: categoryId,
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

    if (categoryId === null)
        return <NotFoundPage>Такой категории нет 😢</NotFoundPage>;

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

const ProductsPage = () => (
    <AuthDependentView
        authorized={<ProductsPageView isAuthorized />}
        unauthorized={<ProductsPageView />}
        checking={<PageLoader />}
    />
);

export default ProductsPage;
