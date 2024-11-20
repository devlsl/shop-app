import { DbService, Handlers } from '../types';

type Options = {
    staticServerHostname: string;
};

type Dependencies = {
    db: DbService;
};

export default (
        { staticServerHostname }: Options,
        { db }: Dependencies,
    ): Handlers['getProductsForProductPageForUser'] =>
    async (context, payload) => {
        const products = (await db.product.get()).filter((p) => {
            if (p.categoryId !== payload.categoryId) return false;
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
                        if (p.features[filterKey] === undefined) return false;
                        return filterOptions!.includes(p.features[filterKey]);
                    }, true);
                if (!productFitsFilters) return false;
            }
            return true;
        });

        const { limit = products.length, startIndex = 0 } = payload;

        const favorites = Object.fromEntries(
            (await db.favoriteItem.get())
                .filter((i) => i.userId === context.id)
                .map((i) => [i.productId, i.productId]),
        );

        let items = products
            .map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                leftInStock: p.leftInStock,
                isLiked: favorites[p.id] !== undefined,
                miniatures: p.media
                    .filter((m) => m.type === 'image')
                    .map((m) => ({
                        url: `${staticServerHostname}/${m.sizes.preview}`,
                    })),
            }))
            .slice(startIndex, startIndex + limit);

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
            totalProductsCount: products.length,
            items,
        };
    };
