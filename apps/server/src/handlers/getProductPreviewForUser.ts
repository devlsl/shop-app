import { DbService, Handlers } from '../types';

type Options = {
    staticServerHostname: string;
};

type Dependencies = {
    db: DbService;
};

export default (
        { staticServerHostname }: Options,
        { db }: Dependencies,
    ): Handlers['getProductPreviewForUser'] =>
    async (context, payload) => {
        const product = (await db.product.get()).find(
            (p) => p.id === payload.productId,
        );

        if (product === undefined) return undefined;

        const isLiked =
            (await db.favoriteItem.get()).find(
                (i) =>
                    i.userId === context.id &&
                    i.productId === payload.productId,
            ) === undefined
                ? false
                : true;

        return {
            id: product.id,
            media: product.media
                .filter((m) => m.type === 'image')
                .map((m) => ({
                    url: `${staticServerHostname}/${m.sizes.main}`,
                })),
            leftInStock: product.leftInStock,
            name: product.name,
            price: product.price,
            isLiked,
        };
    };
