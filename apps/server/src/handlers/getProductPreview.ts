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
    ): Handlers['getProductPreview'] =>
    async (payload) => {
        const product = (await db.product.get()).find(
            (p) => p.id === payload.productId,
        );

        if (product === undefined) return undefined;

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
        };
    };
