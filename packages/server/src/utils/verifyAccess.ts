import { left } from '@sweet-monads/either';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { VerifyAccess } from 'ts-api-generator';
import { parse } from './zodParser.js';
import { getCookie } from './getCookie.js';

type Options = {
    jwtSecret: string;
    accessTokenExpInSec: number;
};

export const createVerifyAccess =
    (options: Options): VerifyAccess =>
    (request) => {
        const accessToken = getCookie(request, 'accessToken');
        if (!accessToken) return left('Unauthorized');
        try {
            const payload = jwt.verify(accessToken, options.jwtSecret, {
                maxAge: options.accessTokenExpInSec,
            });
            return parse(
                z.object({
                    id: z.string(),
                    role: z.string(),
                }),
                payload,
            ).mapLeft(() => 'Unauthorized');
        } catch {
            return left('Unauthorized');
        }
    };
