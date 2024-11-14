import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Handlers } from './types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
import { getUserByEmail } from '../shared/getUserByEmail';
import { createSession } from '../shared/createSession';

type Options = {
    secret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
};

export default (options: Options): Handlers['signInByEmailAndPassword'] =>
    async (payload, _, response) => {
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const maybeUser = await getUserByEmail(payload.email);
        if (maybeUser.isLeft()) return new ActionError('BadAuthData');
        const user = maybeUser.value;
        const isPasswordRight = await bcrypt.compare(
            payload.password,
            user.passwordHash,
        );
        if (!isPasswordRight) return new ActionError('BadAuthData');
        const maybeNewSession = await createSession(
            user.id,
            refreshTokenExpDate.toISOString(),
        );
        if (maybeNewSession.isLeft()) return new ActionError('BadAuthData');
        const newSession = maybeNewSession.value;
        const authContext: AuthContext = { id: user.id, role: user.role };
        const accessToken = jwt.sign(authContext, options.secret, {
            expiresIn: options.accessTokenExpInSec,
        });
        setCookie(response, 'accessToken', accessToken, {
            maxAge: options.accessTokenExpInSec,
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: options.refreshTokenExpInSec,
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
