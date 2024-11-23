import { ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(70);

export const apiSchema = {
    checkAuth: {
        roles: true,
        return: z.object({ id: z.string(), role: z.string() }),
    },
    refreshAuth: {
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        errors: ['Unauthorized'],
    },
    signOut: {
        roles: true,
        lowLevel: true,
    },
    signIn: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    signUp: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    getCategoriesPageItems: {
        payload: z.object({ categoryId: z.string().nullable() }),
        return: z.object({
            id: z.string().nullable(),
            haveProducts: z.boolean(),
            backCategoryId: z.string().nullable().optional(),
            items: z
                .object({
                    id: z.string(),
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
        payload: z.object({ categoryId: z.string().uuid().nullable() }),
        return: z.record(z.string(), z.string().array().optional()),
        // [
        //     z.object({
        //         type: z.literal('number'),
        //         key: z.string(),
        //         from: z.number(),
        //         to: z.number(),
        //     }),
        //     z.object({
        //         type: z.literal('string'),
        //         key: z.string(),
        //         values: z.string().array(),
        //     }),
        //     z.object({
        //         type: z.literal('boolean'),
        //         key: z.string(),
        //     }),
        // ])
        // .array(),
        errors: ['CategoryNotFound'],
    },
    getCategoryPath: {
        payload: z.object({ categoryId: z.string().uuid().nullable() }),
        return: z
            .object({
                id: z.string(),
                name: z.string(),
            })
            .array(),
        errors: ['CategoryNotFound'],
    },
    getProductsPageItemsForGuest: {
        payload: z.object({
            categoryId: z.string().uuid().nullable().optional(),
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
                    id: z.string(),
                    categoryId: z.string().uuid().nullable(),
                    name: z.string(),
                    price: z.string(),
                    leftInStock: z.number(),
                    miniatures: z.object({ url: z.string() }).array(),
                    isLiked: z.boolean(),
                })
                .array(),
        }),
    },
    getProductsPageItems: {
        roles: true,
        payload: z.object({
            categoryId: z.string().uuid().nullable().optional(),
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
                    id: z.string(),
                    categoryId: z.string().uuid().nullable(),
                    name: z.string(),
                    price: z.string(),
                    leftInStock: z.number(),
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
                    id: z.string(),
                    categoryId: z.string().uuid().nullable(),
                    name: z.string(),
                    price: z.string(),
                    isLiked: z.boolean(),
                    leftInStock: z.number(),
                    miniatures: z.object({ url: z.string() }).array(),
                })
                .array(),
        }),
    },
    addProductToCart: {
        roles: true,
        payload: z.object({
            productId: z.string().uuid(),
            count: z.number().positive(),
        }),
        errors: ['OutOfStock'],
    },
    deleteProductFromCart: {
        roles: true,
        payload: z.object({
            productId: z.string().uuid(),
            count: z.number().positive().or(z.literal('all')),
        }),
    },
    addProductToFavorites: {
        roles: true,
        payload: z.object({
            productId: z.string().uuid(),
        }),
    },
    deleteProductFromFavorites: {
        roles: true,
        payload: z.object({
            productId: z.string().uuid(),
        }),
    },
    getProduct: {
        roles: true,
        payload: z.object({
            productId: z.string().uuid(),
        }),
        return: z
            .object({
                id: z.string(),
                categoryId: z.string().uuid().nullable(),
                name: z.string(),
                price: z.string(),
                leftInStock: z.number(),
                media: z.object({ url: z.string() }).array(),
                isLiked: z.boolean(),
                features: z.record(z.string(), z.string()),
            })
            .optional(),
    },
    getProductForGuest: {
        payload: z.object({
            productId: z.string().uuid(),
        }),
        return: z
            .object({
                id: z.string(),
                categoryId: z.string().uuid().nullable(),
                name: z.string(),
                price: z.string(),
                leftInStock: z.number(),
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
                productId: z.string().uuid(),
                categoryId: z.string().uuid().nullable(),
                count: z.number().nonnegative(),
                leftInStock: z.number().nonnegative(),
                name: z.string(),
                price: z.number().nonnegative(),
                miniatures: z.object({ url: z.string() }).array(),
            })
            .array(),
    },
    makeOrder: {
        roles: true,
        payload: z
            .object({
                productId: z.string().uuid(),
                count: z.number().nonnegative(),
            })
            .array(),
        return: z.object({ orderMade: z.literal(true) }).or(
            z.object({
                orderMade: z.literal(false),
                outOfStockItems: z.object({
                    productId: z.string().uuid(),
                    userWant: z.number().nonnegative(),
                    inStock: z.number().nonnegative(),
                }),
            }),
        ),
    },
} as const satisfies ActionOptionsMap;
