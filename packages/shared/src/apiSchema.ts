import { ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(70);
const orderStatusSchema = z.enum([
    'awaitedPayment',
    'paid',
    'sent',
    'rejected',
    'delivered',
    'received',
]);
const orderNumberSchema = z.string().length(8);
const idSchema = z.string().uuid();

export const apiSchema = {
    checkAuth: {
        roles: true,
        return: z.object({ id: idSchema, role: z.string() }),
    },
    refreshAuth: {
        return: z.object({ id: idSchema, role: z.string() }),
        lowLevel: true,
        errors: ['Unauthorized'],
    },
    signOut: {
        roles: true,
        lowLevel: true,
    },
    signIn: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: idSchema, role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    signUp: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: idSchema, role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    getCategoriesPageItems: {
        payload: z.object({ categoryId: idSchema.nullable() }),
        return: z.object({
            id: idSchema.nullable(),
            haveProducts: z.boolean(),
            backCategoryId: idSchema.nullable().optional(),
            items: z
                .object({
                    id: idSchema,
                    name: z.string(),
                    imageUrl: z.string().url(),
                    haveProducts: z.boolean(),
                    haveNestedCategories: z.boolean(),
                })
                .array(),
        }),
        errors: ['CategoryNotFound'],
    },
    getFilters: {
        payload: z.object({ categoryId: idSchema.nullable() }),
        return: z.record(z.string(), z.string().array().optional()),
        errors: ['CategoryNotFound'],
    },
    getCategoryPath: {
        payload: z.object({ categoryId: idSchema.nullable() }),
        return: z
            .object({
                id: idSchema,
                name: z.string(),
            })
            .array(),
        errors: ['CategoryNotFound'],
    },
    getProductsPageItemsForGuest: {
        payload: z.object({
            categoryId: idSchema.nullable().optional(),
            includeNestedCategories: z.boolean().optional(),
            startIndex: z.number().nonnegative().optional(),
            limit: z.number().positive().optional(),
            search: z.string().optional(),
            sort: z
                .record(z.string(), z.enum(['asc', 'desc']).optional())
                .optional(),
            filters: z
                .record(z.string(), z.string().array().optional())
                .optional(),
        }),
        return: z.object({
            totalProductsCount: z.number(),
            items: z
                .object({
                    id: idSchema,
                    categoryId: idSchema.nullable(),
                    name: z.string(),
                    price: z.string(),
                    miniatures: z.object({ url: z.string() }).array(),
                    isLiked: z.boolean(),
                })
                .array(),
        }),
    },
    getProductsPageItems: {
        roles: true,
        payload: z.object({
            categoryId: idSchema.nullable().optional(),
            includeNestedCategories: z.boolean().optional(),
            startIndex: z.number().nonnegative().optional(),
            limit: z.number().positive().optional(),
            search: z.string().optional(),
            sort: z
                .record(z.string(), z.enum(['asc', 'desc']).optional())
                .optional(),
            filters: z
                .record(z.string(), z.string().array().optional())
                .optional(),
        }),
        return: z.object({
            totalProductsCount: z.number(),
            items: z
                .object({
                    id: idSchema,
                    categoryId: idSchema.nullable(),
                    name: z.string(),
                    price: z.string(),
                    miniatures: z.object({ url: z.string() }).array(),
                    isLiked: z.boolean(),
                })
                .array(),
        }),
    },
    getFiltersForFavorites: {
        roles: true,
        return: z.record(z.string(), z.string().array().optional()),
    },
    getFavoritesPageItems: {
        roles: true,
        payload: z.object({
            startIndex: z.number().nonnegative().optional(),
            limit: z.number().positive().optional(),
            search: z.string().optional(),
            sort: z
                .record(z.string(), z.enum(['asc', 'desc']).optional())
                .optional(),
            filters: z
                .record(z.string(), z.string().array().optional())
                .optional(),
        }),
        return: z.object({
            totalProductsCount: z.number(),
            items: z
                .object({
                    id: idSchema,
                    categoryId: idSchema.nullable(),
                    name: z.string(),
                    price: z.string(),
                    isLiked: z.boolean(),
                    miniatures: z.object({ url: z.string() }).array(),
                })
                .array(),
        }),
    },
    addProductToCart: {
        roles: true,
        payload: z.object({
            productId: idSchema,
            count: z.number().positive(),
        }),
        errors: ['OutOfStock'],
    },
    deleteProductFromCart: {
        roles: true,
        payload: z.object({
            productId: idSchema,
            count: z.number().positive().or(z.literal('all')),
        }),
    },
    addProductToFavorites: {
        roles: true,
        payload: z.object({
            productId: idSchema,
        }),
    },
    deleteProductFromFavorites: {
        roles: true,
        payload: z.object({
            productId: idSchema,
        }),
    },
    getProduct: {
        roles: true,
        payload: z.object({
            productId: idSchema,
        }),
        return: z
            .object({
                id: z.string(),
                categoryId: idSchema.nullable(),
                name: z.string(),
                price: z.string(),
                media: z.object({ url: z.string() }).array(),
                isLiked: z.boolean(),
                features: z.record(z.string(), z.string()),
            })
            .optional(),
    },
    getProductForGuest: {
        payload: z.object({
            productId: idSchema,
        }),
        return: z
            .object({
                id: z.string(),
                categoryId: idSchema.nullable(),
                name: z.string(),
                price: z.string(),
                media: z.object({ url: z.string() }).array(),
                isLiked: z.boolean(),
                features: z.record(z.string(), z.string()),
            })
            .optional(),
    },
    getCart: {
        roles: true,
        return: z
            .object({
                productId: idSchema,
                categoryId: idSchema.nullable(),
                count: z.number().nonnegative(),
                name: z.string(),
                price: z.number().nonnegative(),
                miniatures: z.object({ url: z.string() }).array(),
            })
            .array(),
    },
    makeOrder: {
        roles: true,
        errors: ['ZeroItems'],
        payload: z
            .object({
                productId: idSchema,
                count: z.number().nonnegative(),
            })
            .array(),
        return: z
            .object({
                orderMade: z.literal(true),
                amount: z.number().nonnegative(),
            })
            .or(
                z.object({
                    orderMade: z.literal(false),
                    outOfStockItems: z
                        .object({
                            productId: idSchema,
                            userWant: z.number().nonnegative(),
                            inStock: z.number().nonnegative(),
                        })
                        .optional(),
                }),
            ),
    },
    getOrders: {
        roles: true,
        return: z
            .object({
                id: idSchema,
                orderNumber: orderNumberSchema,
                status: orderStatusSchema,
                miniatures: z
                    .object({
                        productId: idSchema,
                        categoryId: idSchema.nullable(),
                        url: z.string().url(),
                    })
                    .array(),
                createdAt: z.string().datetime(),
                productsCount: z.number().nonnegative(),
                amount: z.number().nonnegative(),
            })
            .array(),
    },
    getOrder: {
        roles: true,
        payload: z.object({
            orderId: idSchema,
        }),
        errors: ['NotFound'],
        return: z.object({
            id: idSchema,
            orderNumber: orderNumberSchema,
            status: orderStatusSchema,
            createdAt: z.string().datetime(),
            paidAt: z.string().datetime().optional(),
            sentAt: z.string().datetime().optional(),
            deliveredAt: z.string().datetime().optional(),
            receivedAt: z.string().datetime().optional(),
            rejectedAt: z.string().datetime().optional(),
            productsCount: z.number().nonnegative(),
            amount: z.number().nonnegative(),
            items: z
                .object({
                    productId: idSchema,
                    categoryId: idSchema.nullable(),
                    name: z.string(),
                    miniature: z.string().url(),
                    count: z.number().positive(),
                    price: z.number().positive(),
                })
                .array(),
        }),
    },
} as const satisfies ActionOptionsMap;
