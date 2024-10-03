import { ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';

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
        payload: z.object({ email: z.string(), password: z.string() }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
    signUpByEmailAndPassword: {
        payload: z.object({ email: z.string(), password: z.string() }),
        return: z.object({ id: z.string(), role: z.string() }),
        lowLevel: true,
        roles: false,
        errors: ['BadAuthData'],
    },
} as const satisfies ActionOptionsMap;
