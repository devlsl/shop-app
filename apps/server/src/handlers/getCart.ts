import { Handlers, HandlersProps } from '../types';
import { getAvailableProductsCount } from './shared/getAvailableProductsCount';

export default (props: HandlersProps): Handlers['getCart'] =>
    async (context) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );
        const cartItems = (await props.storage.cartItem.get())
            .filter((i) => i.userId === context.id)
            .reduce<
                Record<string, number | undefined>
            >((result, i) => ({ ...result, [i.productId]: (result[i.productId] ?? 0) + 1 }), {});

        const availableProductsCount = await getAvailableProductsCount(
            props,
            context,
        );

        return Object.entries(cartItems).map(([id, count]) => {
            const product = products[id];
            return {
                count: count ?? 0,
                leftInStock: (count ?? 0) + (availableProductsCount[id] ?? 0),
                categoryId: product.categoryId,
                miniatures: product.media
                    .filter((m) => m.type === 'image')
                    .map((m) => ({
                        url: `${props.STATIC_SERVER_HOSTNAME}/${m.sizes.preview}`,
                    })),
                name: product.name,
                price: Number(product.price) || 0,
                productId: product.id,
            };
        });
    };
