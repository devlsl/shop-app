import { Handlers, HandlersProps } from '../types';

export default (props: HandlersProps): Handlers['addProductToFavorites'] =>
    async (context, payload) =>
        props.storage.favoriteItem.set(
            (await props.storage.favoriteItem.get())
                .filter(
                    (i) =>
                        i.productId !== payload.productId ||
                        i.userId !== context.id,
                )
                .concat({
                    userId: context.id,
                    productId: payload.productId,
                }),
        );
