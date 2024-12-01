import { left } from '@sweet-monads/either';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { VerifyAccess } from 'ts-api-generator';
import { parse } from '../../utils/zodParser';
import { getCookie } from '../../utils/getCookie';
import { HandlersProps } from '../../types';

export const createVerifyAccess =
    (props: HandlersProps): VerifyAccess =>
    (request) => {
        const accessToken = getCookie(request, 'accessToken');
        if (!accessToken) return left('Unauthorized');
        try {
            const payload = jwt.verify(accessToken, props.SERVER_JWT_SECRET, {
                maxAge: Number(props.SERVER_ACCESS_TOKEN_EXP_IN_SEC),
            });
            return parse(
                z.object({
                    id: z.string(),
                    role: z.string(),
                }),
                payload,
            ).mapLeft(() => 'Unauthorized');
        } catch (error) {
            console.log(error);
            return left('Unauthorized');
        }
    };
