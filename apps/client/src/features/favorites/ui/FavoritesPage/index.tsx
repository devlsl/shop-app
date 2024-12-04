import { useEffect, useState } from 'react';
import { useApi } from '../../../api';
import { useIntersectionObserver } from '../../../../shared/hooks/useIntersectionObserver';
import { matchMediaBreakpoint } from '../../../breakpoints';
import { PageLoader } from '../../../../shared/ui/PageLoader';
import { NotFoundPage } from '../../../../shared/ui/NotFoundPage';
import {
    LazyLoadingTrigger,
    ProductsView,
} from '../../../products/features/productsPage/ui/ProductsGrid';
import { AuthNeedPage } from '../../../auth';
import {
    parseProductFilters,
    parseProductSorting,
} from '../../../products/features/filters';
import { useNavigationParam } from '../../../navigation';

export const ProductsPageView = () => {
    const [lazyLoadElementRef, lazyLoadEntry] = useIntersectionObserver({
        threshold: 0,
    });

    const filters = useNavigationParam('filters');
    const sorting = useNavigationParam('sorting');
    const searchQuery = useNavigationParam('search');

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
