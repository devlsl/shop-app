import { Handlers, HandlersProps } from '../../types';
import { getCookie } from '../../utils/getCookie';
import { setCookie } from '../../utils/setCookie';

export default (props: HandlersProps): Handlers['signOut'] =>
    async (context, request, response) => {
        setCookie(response, 'accessToken', '', {
            httpOnly: true,
            sameSite: 'None',
            // secure: true,
            path: '/',
        });
        setCookie(response, 'refreshToken', '', {
            httpOnly: true,
            sameSite: 'None',
            // secure: true,
            path: '/',
        });

        const refreshToken = getCookie(request, 'refreshToken');
        if (refreshToken === undefined) return;
        await props.storage.session.set(
            (await props.storage.session.get()).filter(
                (s) => s.id !== refreshToken || s.userId !== context.id,
            ),
        );
    };
