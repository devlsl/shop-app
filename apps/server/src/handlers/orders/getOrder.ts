import { ActionError } from 'ts-api-generator';
import { Handlers, HandlersProps } from '../../types';
import { calcOrderStatus } from '../shared/calcOrderStatus';

export default (props: HandlersProps): Handlers['getOrder'] =>
    async (context, payload) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );
        const order = (await props.storage.order.get()).find(
            (o) =>
                o.userId === context.id &&
                o.id === payload.orderId &&
                o.deletedAt === undefined,
        );
        if (order === undefined) return new ActionError('NotFound');

        const status = calcOrderStatus(order);

        const [productsCount, amount] = order.items.reduce<[number, number]>(
            (acc, i) => [acc[0] + i.count, acc[1] + i.count * i.price],
            [0, 0],
        );

        return {
            id: order.id,
            amount,
            status,
            productsCount,
            items: order.items.map((i) => {
                const product = products[i.productId];
                return {
                    productId: product.id,
                    categoryId: product.categoryId,
                    count: i.count,
                    miniature:
                        product.media
                            .filter((m) => m.type === 'image')
                            .map(
                                (m) =>
                                    `${props.STATIC_SERVER_HOSTNAME}/${m.sizes.preview}`,
                            )[0] ?? '',
                    name: product.name,
                    price: i.price,
                };
            }),
            orderNumber: order.orderNumber,
            paidAt: order.paidAt,
            deliveredAt: order.deliveredAt,
            receivedAt: order.receivedAt,
            rejectedAt: order.rejectedAt,
            sentAt: order.sentAt,
            createdAt: order.createdAt,
        };
    };
