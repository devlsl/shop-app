import { z } from 'zod';
import { zodStrictRecord } from './utils/zodStrictRecord.js';

export const storageSchema = {
    user: z.object({
        id: z.string(),
        email: z.string().email(),
        role: z.string(),
        passwordHashSalt: z.string(),
        passwordHash: z.string(),
    }),
    session: z.object({
        id: z.string(),
        userId: z.string(),
        expirationDate: z.string().datetime(),
    }),
    category: z.object({
        id: z.string(),
        name: z.string(),
        imageId: z.string().uuid(),
        parentCategoryId: z.string().nullable(),
    }),
    product: z.object({
        id: z.string().uuid(),
        name: z.string(),
        price: z.string(),
        categoryId: z.string().uuid(),
        leftInStock: z.number(),
        features: z.record(z.string(), z.string()),
        media: z
            .object({
                type: z.literal('image'),
                sizes: zodStrictRecord(
                    z.enum(['preview', 'main']),
                    z.string().uuid(),
                ),
            })
            .array(),
    }),
    file: z.object({
        id: z.string().uuid(),
    }),
    favoriteItem: z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
    }),
    cartItem: z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
        addedAt: z.string().datetime(),
    }),
} as const satisfies Record<string, z.ZodTypeAny>;
