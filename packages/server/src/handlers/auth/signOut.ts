import { Handlers } from '../types.js';
import { deleteSession } from '../../db/methods.js';
import { getCookie } from '../../utils/getCookie.js';
import { setCookie } from '../../utils/setCookie.js';

const signOut: Handlers['signOut'] = async (context, request, response) => {
    const refreshToken = getCookie(request, 'refreshToken');
    if (refreshToken) await deleteSession(refreshToken, context.id);
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
};

export default signOut;
