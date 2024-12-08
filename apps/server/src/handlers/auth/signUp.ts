import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Handlers, HandlersProps, StorageEntities } from '../../types';
import { ActionError, AuthContext } from 'ts-api-generator';
import { setCookie } from '../../utils/setCookie';
import { generateId } from '../../utils/generateId';

export default (props: HandlersProps): Handlers['signUp'] =>
    async (payload, _, response) => {
        const users = await props.storage.user.get();
        const refreshTokenExpDate = new Date(
            Date.now() + Number(props.SERVER_REFRESH_TOKEN_EXP_IN_SEC) * 1000,
        );
        const alreadyExistUser = users.find((u) => u.email === payload.email);
        if (alreadyExistUser !== undefined)
            return new ActionError('BadAuthData');
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(payload.password, salt);

        const newUser = {
            id: generateId(),
            email: payload.email,
            passwordHash: passwordHash,
            passwordHashSalt: salt,
            role: 'user',
        } satisfies StorageEntities['user'];
        await props.storage.user.set(users.concat(newUser));
        const newSession = {
            id: generateId(),
            userId: newUser.id,
            expirationDate: refreshTokenExpDate.toISOString(),
        } satisfies StorageEntities['session'];
        await props.storage.session.set(
            (await props.storage.session.get()).concat(newSession),
        );
        const authContext: AuthContext = { id: newUser.id, role: newUser.role };
        const accessToken = jwt.sign(authContext, props.SERVER_JWT_SECRET, {
            expiresIn: Number(props.SERVER_ACCESS_TOKEN_EXP_IN_SEC),
        });
        setCookie(response, 'accessToken', accessToken, {
            maxAge: Number(props.SERVER_ACCESS_TOKEN_EXP_IN_SEC),
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        setCookie(response, 'refreshToken', newSession.id, {
            maxAge: Number(props.SERVER_REFRESH_TOKEN_EXP_IN_SEC),
            httpOnly: true,
            path: '/',
            sameSite: 'None',
            secure: true,
        });
        return authContext;
    };
