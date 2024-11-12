import { ActionOptionsMap, createDefaultHttpClient } from 'ts-api-generator';
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
        payload: z.object({ categoryId: z.string() }),
        return: z
            .union([
                z.object({
                    type: z.literal('number'),
                    key: z.string(),
                    from: z.number(),
                    to: z.number(),
                }),
                z.object({
                    type: z.literal('string'),
                    key: z.string(),
                    values: z.string().array(),
                }),
                z.object({
                    type: z.literal('boolean'),
                    key: z.string(),
                }),
            ])
            .array(),
        errors: ['CategoryNotFound'],
    },
    getCategoryPath: {
        payload: z.object({ categoryId: z.string().nullable() }),
        return: z
            .object({
                id: z.string(),
                name: z.string(),
            })
            .array(),
        errors: ['CategoryNotFound'],
    },
    getProductsForProductPage: {
        payload: z.object({
            categoryId: z.string().nullable().optional(),
            includeNestedCategories: z.boolean().optional(),
            startIndex: z.number().nonnegative().optional(),
            limit: z.number().positive().optional(),
            sort: z
                .object({ key: z.string(), value: z.enum(['asc', 'desc']) })
                .array()
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
                    categoryId: z.string(),
                    leftInStock: z.number(),
                    features: z.record(z.string(), z.string().optional()),
                    miniatures: z.object({ url: z.string() }).array(),
                })
                .array(),
        }),
    },
    todo: {},
} as const satisfies ActionOptionsMap;
