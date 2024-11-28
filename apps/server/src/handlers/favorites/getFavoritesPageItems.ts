import { Handlers, HandlersProps } from '../../types';

export default (props: HandlersProps): Handlers['getFavoritesPageItems'] =>
    async (context, payload) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );
        const favoriteItems = (await props.storage.favoriteItem.get())

            .filter((p) => p.userId === context.id)
            .map((p) => products[p.productId])
            .filter((p) => {
                const searchQuery = payload.search;
                const productNameInLowerCase = p.name.toLowerCase();
                if (searchQuery !== undefined) {
                    const matchesQuery = searchQuery
                        .replace(/\s\s+/g, ' ')
                        .toLowerCase()
                        .split(' ')
                        .reduce(
                            (result, word) =>
                                result
                                    ? productNameInLowerCase.includes(word)
                                    : false,
                            true,
                        );
                    if (!matchesQuery) return false;
                }
                if (payload.filters !== undefined) {
                    const productFitsFilters = Object.entries(payload.filters)
                        .filter((f) => f[1] !== undefined)
                        .reduce((result, [filterKey, filterOptions]) => {
                            if (!result) return false;
                            if (p.features[filterKey] === undefined)
                                return false;
                            return filterOptions!.includes(
                                p.features[filterKey],
                            );
                        }, true);
                    if (!productFitsFilters) return false;
                }
                return true;
            });

        const { limit = favoriteItems.length, startIndex = 0 } = payload;

        let items = favoriteItems.map((p) => ({
            id: p.id,
            categoryId: p.categoryId,
            name: p.name,
            price: p.price,
            leftInStock: p.leftInStock,
            isLiked: true,
            miniatures: p.media
                .filter((m) => m.type === 'image')
                .map((m) => ({
                    url: `${props.STATIC_SERVER_HOSTNAME}/${m.sizes.preview}`,
                })),
        }));

        const needSortByPrice =
            payload.sort?.price !== undefined && payload.sort?.price;

        if (needSortByPrice) {
            items = items.sort(
                (a, b) =>
                    (needSortByPrice === 'asc' ? 1 : -1) *
                    ((Number(a.price) || 0) - (Number(b.price) || 0)),
            );
        }

        return {
            totalProductsCount: favoriteItems.length,
            items: items.slice(startIndex, startIndex + limit),
        };
    };
