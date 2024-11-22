import jwt from 'jsonwebtoken';
import { Handlers, HandlersProps, StorageEntities } from '../types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
import { getCookie } from '../utils/getCookie';
import { generateId } from '../utils/generateId';

export default (props: HandlersProps): Handlers['refreshAuth'] =>
    async (request, response) => {
        const refreshTokenExpDate = new Date(
            Date.now() + Number(props.CLIENT_REFRESH_TOKEN_EXP_IN_SEC) * 1000,
        );
        const refreshToken = getCookie(request, 'refreshToken');
        if (!refreshToken) return new ActionError('Unauthorized');
        const session = (await props.storage.session.get()).find(
            (s) => s.id === refreshToken,
        );
        if (session === undefined) return new ActionError('Unauthorized');
        const user = (await props.storage.user.get()).find(
            (u) => u.id === session.userId,
        );
        if (user === undefined) return new ActionError('Unauthorized');
        const newSession = {
            id: generateId(),
            userId: user.id,
            expirationDate: refreshTokenExpDate.toISOString(),
        } satisfies StorageEntities['session'];
        await props.storage.session.set(
            (await props.storage.session.get()).concat(newSession),
        );
        const authContext: AuthContext = { id: user.id, role: user.role };
        const accessToken = jwt.sign(authContext, props.CLIENT_JWT_SECRET, {
            expiresIn: props.CLIENT_ACCESS_TOKEN_EXP_IN_SEC,
        });
        setCookie(response, 'accessToken', accessToken, {
            maxAge: Number(props.CLIENT_ACCESS_TOKEN_EXP_IN_SEC),
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: Number(props.CLIENT_REFRESH_TOKEN_EXP_IN_SEC),
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
