import { DbService, Handlers } from '../types';

type Dependencies = {
    db: DbService;
};

export default ({ db }: Dependencies): Handlers['deleteProductFromFavorites'] =>
    async (context, payload) =>
        db.favoriteItem.set(
            (await db.favoriteItem.get()).filter(
                (i) =>
                    i.productId !== payload.productId ||
                    i.userId !== context.id,
            ),
        );
