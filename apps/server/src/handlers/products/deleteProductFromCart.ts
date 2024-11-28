import { Handlers, HandlersProps } from '../../types';

export default (props: HandlersProps): Handlers['deleteProductFromCart'] =>
    async (context, payload) => {
        let deletedCount = payload.count;
        props.storage.cartItem.set(
            (await props.storage.cartItem.get())
                .sort((a, b) => a.addedAt.localeCompare(b.addedAt))
                .filter((i) => {
                    if (
                        typeof deletedCount === 'string' &&
                        i.productId === payload.productId &&
                        i.userId === context.id
                    ) {
                        return false;
                    }

                    if (
                        typeof deletedCount === 'number' &&
                        deletedCount > 0 &&
                        i.productId === payload.productId &&
                        i.userId === context.id
                    ) {
                        deletedCount = deletedCount - 1;
                        return false;
                    }
                    return true;
                }),
        );
    };
