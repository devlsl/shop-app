import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Handlers, HandlersProps, StorageEntities } from '../types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
import { generateId } from '../utils/generateId';

export default (props: HandlersProps): Handlers['signIn'] =>
    async (payload, _, response) => {
        const dbUsers = await props.storage.user.get();
        const refreshTokenExpDate = new Date(
            Date.now() + Number(props.CLIENT_REFRESH_TOKEN_EXP_IN_SEC) * 1000,
        );
        const user = dbUsers.find((u) => u.email === payload.email);
        if (user === undefined) return new ActionError('BadAuthData');
        const isPasswordRight = await bcrypt.compare(
            payload.password,
            user.passwordHash,
        );
        if (!isPasswordRight) return new ActionError('BadAuthData');
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
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: Number(props.CLIENT_REFRESH_TOKEN_EXP_IN_SEC),
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
