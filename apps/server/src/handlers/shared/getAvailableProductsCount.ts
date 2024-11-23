import { AuthContext } from 'ts-api-generator';
import { HandlersProps } from '../../types';
import { minutesSince } from '../../utils/minutesSince';

export const getAvailableProductsCount = async (
    props: HandlersProps,
    context: AuthContext,
): Promise<Record<string, number | undefined>> => {
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

    const holdProducts = cartItems.reduce<Record<string, number | undefined>>(
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

    return Object.fromEntries(
        productsInStock.map((p) => [
            p.id,
            p.leftInStock -
                (holdProducts[p.id] ?? 0) -
                (awaitingPaymentProducts[p.id] ?? 0), // todo протестить
        ]),
    );
};
