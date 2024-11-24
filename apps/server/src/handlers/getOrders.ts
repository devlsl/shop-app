import { Handlers, HandlersProps } from '../types';
import { calcOrderStatus } from './shared/calcOrderStatus';

export default (props: HandlersProps): Handlers['getOrders'] =>
    async (context) => {
        const products = Object.fromEntries(
            (await props.storage.product.get()).map((p) => [p.id, p]),
        );
        return (await props.storage.order.get())
            .filter((o) => o.userId === context.id && o.deletedAt === undefined)
            .map((o) => {
                const status = calcOrderStatus(o);

                const [productsCount, amount] = o.items.reduce<
                    [number, number]
                >(
                    (acc, i) => [acc[0] + i.count, acc[1] + i.count * i.price],
                    [0, 0],
                );

                return {
                    id: o.id,
                    orderNumber: o.orderNumber,
                    status,
                    amount,
                    productsCount,
                    miniatures: o.items.map((i) => ({
                        productId: i.productId,
                        categoryId: products[i.productId].categoryId,
                        url:
                            products[i.productId].media
                                .filter((m) => m.type === 'image')
                                .map(
                                    (m) =>
                                        `${props.STATIC_SERVER_HOSTNAME}/${m.sizes.preview}`,
                                )[0] ?? '',
                    })),
                    createdAt: o.createdAt,
                };
            });
    };
