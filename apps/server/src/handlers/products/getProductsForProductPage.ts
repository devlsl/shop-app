import { db } from '../../db';
import { Handlers } from '../types';

type Options = {
    staticServerHostname: string;
};

export default (options: Options): Handlers['getProductsForProductPage'] =>
    async (payload) => {
        const products = (await db.products.get()).filter(
            (p) => p.categoryId === payload.categoryId,
        );
        const { limit = products.length, startIndex = 0 } = payload;

        // const fileIds: Record<string, string | undefined> = Object.fromEntries(products.flatMap(p => p.fileIds).map(id => ([id, id])))

        const filesMap = Object.fromEntries(
            (await db.files.get()).map((f) => [f.id, f.id]),
        );

        return {
            totalProductsCount: products.length,
            items: products
                .map((p) => ({
                    miniatures: p.media
                        .filter((m) => m.type === 'image')
                        .map((m) => ({
                            url: `${options.staticServerHostname}/${m.sizes.preview}`,
                        })),
                    categoryId: p.categoryId,
                    features: p.features,
                    id: p.id,
                    leftInStock: p.leftInStock,
                    name: p.name,
                    price: p.price,
                }))
                .slice(startIndex, startIndex + limit),
        };
    };
