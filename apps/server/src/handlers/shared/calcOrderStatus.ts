import { Handlers, StorageEntities } from '../../types';

export const calcOrderStatus = (
    order: StorageEntities['order'],
): Awaited<ReturnType<Handlers['getOrders']>>[0]['status'] => {
    return order.rejectedAt !== undefined
        ? 'rejected'
        : order.paidAt === undefined
          ? 'awaitedPayment'
          : order.sentAt === undefined
            ? 'paid'
            : order.deliveredAt === undefined
              ? 'sent'
              : order.receivedAt === undefined
                ? 'delivered'
                : 'received';
};
