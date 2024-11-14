import { db } from '../db';
import { Handlers } from './types';

type Options = {
    staticServerHostname: string;
};

export default (options: Options): Handlers['getProductPreview'] =>
    async (payload) => {
        const product = (await db.products.get()).find(
            (p) => p.id === payload.productId,
        );

        if (product === undefined) return undefined;

        return {
            id: product.id,
            media: product.media
                .filter((m) => m.type === 'image')
                .map((m) => ({
                    url: `${options.staticServerHostname}/${m.sizes.main}`,
                })),
            leftInStock: product.leftInStock,
            name: product.name,
            price: product.price,
        };
    };
