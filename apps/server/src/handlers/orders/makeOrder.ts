import { ActionError } from 'ts-api-generator';
import { Handlers, HandlersProps, StorageEntities } from '../../types';
import { generateId } from '../../utils/generateId';
import { generateOrderNumber } from '../shared/generateOrderNumber';
import deleteProductFromCart from '../products/deleteProductFromCart';
import { getAvailableForOrderProducts } from '../shared/getAvailableForOrderProducts';

export default (props: HandlersProps): Handlers['makeOrder'] =>
    async (context, payload) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );

        const availableProducts = await getAvailableForOrderProducts(
            props,
            context,
        );

        const itemsCount = payload.reduce((acc, i) => acc + i.count, 0);
        if (itemsCount === 0) return new ActionError('ZeroItems');

        let canMakeOrder = payload.reduce((acc, i) => {
            if (!acc) return false;
            console.log(availableProducts[i.productId]);
            console.log(availableProducts[i.productId] ?? 0);
            console.log(i.count);

            return (availableProducts[i.productId] ?? 0) - i.count >= 0;
        }, true);

        if (!canMakeOrder)
            return {
                orderMade: false,
            };

        await Promise.all(
            payload.map((i) => deleteProductFromCart(props)(context, i)),
        );

        const orders = await props.storage.order.get();
        const contextOrders = orders.filter((o) => o.userId === context.id);

        const newOrder: StorageEntities['order'] = {
            id: generateId(),
            orderNumber: generateOrderNumber(
                contextOrders.map((o) => o.orderNumber),
            ),
            createdAt: new Date().toISOString(),
            items: payload.map((i) => ({
                count: i.count,
                price: Number(products[i.productId].price) || 0,
                productId: i.productId,
            })),
            userId: context.id,
        };

        await props.storage.order.set(orders.concat(newOrder));

        return {
            orderMade: true,
            amount: newOrder.items.reduce(
                (acc, i) => acc + i.count * i.price,
                0,
            ),
        };
    };
