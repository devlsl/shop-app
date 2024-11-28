import { Handlers, HandlersProps } from '../../types';

export default (props: HandlersProps): Handlers['getFiltersForFavorites'] =>
    async (context) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );
        const favorites = (await props.storage.favoriteItem.get())
            .filter((p) => p.userId === context.id)
            .map((p) => products[p.productId]);

        return favorites
            .flatMap((p) => Object.entries(p.features))
            .reduce<Record<string, string[] | undefined>>(
                (result, [key, value]) => ({
                    ...result,
                    [key]: (result[key] ?? [])
                        .filter((v) => v !== value)
                        .concat(value),
                }),
                {},
            );
    };
