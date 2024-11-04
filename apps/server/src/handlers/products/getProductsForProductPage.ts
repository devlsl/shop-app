import { db } from '../../db/instance';
import { Handlers } from '../types';

export const getProductsForProductPage: Handlers['getProductsForProductPage'] =
    async (payload) => {
        const products = await db.products.get();

        return {
            totalProductsCount: products.length,
            items: products.map((p) => ({
                id: p.id,
                categoryId: p.categoryId,
                imageUrl: p.presentImageUrl,
                name: p.categoryId,
                price: p.price,
            })),
        };
    };
