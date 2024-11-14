import { db } from '../db';
import { Handlers } from './types';

type Options = {
    staticServerHostname: string;
};

export default (options: Options): Handlers['getProductsForProductPage'] =>
    async (payload) => {
        const products = (await db.products.get()).filter(
            (p) => p.categoryId === payload.categoryId,
        );
        const { limit = products.length, startIndex = 0 } = payload;

        return {
            totalProductsCount: products.length,
            items: products
                .map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    leftInStock: p.leftInStock,
                    isLiked: false,
                    miniatures: p.media
                        .filter((m) => m.type === 'image')
                        .map((m) => ({
                            url: `${options.staticServerHostname}/${m.sizes.preview}`,
                        })),
                }))
                .slice(startIndex, startIndex + limit),
        };
    };
