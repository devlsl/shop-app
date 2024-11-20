import { ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(70);

export const apiSchema = {
    checkAuth: {
        return: z.object({ id: z.string(), role: z.string() }),
        roles: true,
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
    signInByEmailAndPassword: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    signUpByEmailAndPassword: {
        payload: z.object({ email: emailSchema, password: passwordSchema }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    getCategoriesPageData: {
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
    getFiltersForCategory: {
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
    getProductPreviewForUser: {
        roles: true,
        payload: z.object({ productId: z.string().uuid() }),
        return: z
            .object({
                id: z.string(),
                name: z.string(),
                price: z.string(),
                leftInStock: z.number(),
                media: z.object({ url: z.string() }).array(),
                isLiked: z.boolean(),
            })
            .optional(),
    },
    getProductPreview: {
        payload: z.object({ productId: z.string().uuid() }),
        return: z
            .object({
                id: z.string(),
                name: z.string(),
                price: z.string(),
                leftInStock: z.number(),
                media: z.object({ url: z.string() }).array(),
            })
            .optional(),
    },
    getProductsForProductPage: {
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
                    name: z.string(),
                    price: z.string(),
                    leftInStock: z.number(),
                    miniatures: z.object({ url: z.string() }).array(),
                    isLiked: z.boolean(),
                })
                .array(),
        }),
    },
    getProductsForProductPageForUser: {
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
                    name: z.string(),
                    price: z.string(),
                    leftInStock: z.number(),
                    miniatures: z.object({ url: z.string() }).array(),
                    isLiked: z.boolean(),
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
} as const satisfies ActionOptionsMap;
