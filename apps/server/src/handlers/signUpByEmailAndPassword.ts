import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Handlers } from './types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../utils/setCookie';
import { getUserByEmail } from '../shared/getUserByEmail';
import { createUserByEmailAndPassword } from '../shared/createUserByEmailAndPassword';
import { createSession } from '../shared/createSession';

type Options = {
    secret: string;
    accessTokenExpInSec: number;
    refreshTokenExpInSec: number;
};

export default (options: Options): Handlers['signUpByEmailAndPassword'] =>
    async (payload, _, response) => {
        const refreshTokenExpDate = new Date(
            Date.now() + options.refreshTokenExpInSec * 1000,
        );
        const maybeUser = await getUserByEmail(payload.email);
        if (maybeUser.isRight()) return new ActionError('BadAuthData');
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(payload.password, salt);
        const maybeNewUser = await createUserByEmailAndPassword(
            payload.email,
            salt,
            passwordHash,
            'user',
        );
        if (maybeNewUser.isLeft()) return new ActionError('BadAuthData');
        const newUser = maybeNewUser.value;
        const maybeNewSession = await createSession(
            newUser.id,
            refreshTokenExpDate.toISOString(),
        );
        if (maybeNewSession.isLeft()) return new ActionError('BadAuthData');
        const newSession = maybeNewSession.value;
        const authContext: AuthContext = { id: newUser.id, role: newUser.role };
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
