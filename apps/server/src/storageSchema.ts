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
    favoriteItem: z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
    }),
    cartItem: z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
        addedAt: z.string().datetime(),
    }),
    order: z.object({
        id: z.string().uuid(),
        orderNumber: z.string().length(8),
        userId: z.string().uuid(),
        items: z
            .object({
                productId: z.string().uuid(),
                count: z.number().positive(),
                price: z.number().positive(),
            })
            .array(),
        createdAt: z.string().datetime(),
        paidAt: z.string().datetime().optional(),
        sentAt: z.string().datetime().optional(),
        deliveredAt: z.string().datetime().optional(),
        receivedAt: z.string().datetime().optional(),
        rejectedAt: z.string().datetime().optional(),
        deletedAt: z.string().datetime().optional(),
    }),
} as const satisfies Record<string, z.ZodTypeAny>;
