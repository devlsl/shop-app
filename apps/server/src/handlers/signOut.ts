import { DbService, Handlers } from '../types';
import { getCookie } from '../utils/getCookie';
import { setCookie } from '../utils/setCookie';

type Dependencies = {
    db: DbService;
};

export default ({ db }: Dependencies): Handlers['signOut'] =>
    async (context, request, response) => {
        setCookie(response, 'accessToken', '', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: '/',
        });
        setCookie(response, 'refreshToken', '', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: '/',
        });

        const refreshToken = getCookie(request, 'refreshToken');
        if (refreshToken === undefined) return;
        await db.session.set(
            (await db.session.get()).filter(
                (s) => s.id !== refreshToken || s.userId !== context.id,
            ),
        );
    };
