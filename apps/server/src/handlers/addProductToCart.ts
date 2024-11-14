import { ActionError } from 'ts-api-generator';
import { db } from '../db';
import { Handlers } from './types';
import { CartItem } from '../db/schemas';
import { minutesSince } from '../utils/minutesSince';

export const addProductToCart: Handlers['addProductToCart'] = async (
    context,
    payload,
) => {
    const cartItems = await db.cartItems.get();

    const productsInStock = await db.products.get();

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

    return db.cartItems.set(
        cartItems.concat(
            Array(payload.count).fill({
                productId: payload.productId,
                userId: context.id,
                addedAt: new Date().toISOString(),
            } satisfies CartItem),
        ),
    );
};
