import { ActionError } from 'ts-api-generator';
import { DbEntities, DbService, Handlers } from '../types';
import { minutesSince } from '../utils/minutesSince';

type Dependencies = {
    db: DbService;
};

export default ({ db }: Dependencies): Handlers['addProductToCart'] =>
    async (context, payload) => {
        const cartItems = await db.cartItem.get();

        const productsInStock = await db.product.get();

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
                p.leftInStock - (holdProducts[p.id] ?? 0),
            ]),
        );

        if (notHoldProductsInStock[payload.productId] < payload.count) {
            return new ActionError('OutOfStock');
        }

        return db.cartItem.set(
            cartItems.concat(
                Array(payload.count).fill({
                    productId: payload.productId,
                    userId: context.id,
                    addedAt: new Date().toISOString(),
                } satisfies DbEntities['cartItem']),
            ),
        );
    };
