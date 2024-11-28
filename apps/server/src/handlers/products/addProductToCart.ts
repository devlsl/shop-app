import { ActionError } from 'ts-api-generator';
import { Handlers, HandlersProps, StorageEntities } from '../../types';
import { minutesSince } from '../../utils/minutesSince';

export default (props: HandlersProps): Handlers['addProductToCart'] =>
    async (context, payload) => {
        const cartItems = await props.storage.cartItem.get();

        const productsInStock = await props.storage.product.get();

        const awaitingPaymentProducts = (await props.storage.order.get())
            .filter((o) => o.paidAt === undefined && o.rejectedAt === undefined)
            .flatMap((o) => o.items)
            .reduce<Record<string, number | undefined>>((result, order) => {
                return {
                    ...result,
                    [order.productId]: (result[order.productId] ?? 0) + 1,
                };
            }, {});

        const holdLimit = 15; // minutes

        const holdProducts = cartItems.reduce<Record<string, number>>(
            (result, cartItem) => {
                const needToAdd =
                    cartItem.userId === context.id ||
                    minutesSince(cartItem.addedAt) <= holdLimit;
                const prevCount = result[cartItem.productId] ?? 0;
                const resultCount = prevCount + (needToAdd ? 1 : 0);
                return { ...result, [cartItem.productId]: resultCount };
            },
            {},
        );

        const notHoldProductsInStock = Object.fromEntries(
            productsInStock.map((p) => [
                p.id,
                p.leftInStock -
                    (holdProducts[p.id] ?? 0) -
                    (awaitingPaymentProducts[p.id] ?? 0), // todo протестить
            ]),
        );

        if (notHoldProductsInStock[payload.productId] < payload.count) {
            return new ActionError('OutOfStock');
        }

        return props.storage.cartItem.set(
            cartItems.concat(
                Array(payload.count).fill({
                    productId: payload.productId,
                    userId: context.id,
                    addedAt: new Date().toISOString(),
                } satisfies StorageEntities['cartItem']),
            ),
        );
    };
