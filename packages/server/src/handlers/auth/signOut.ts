import { Handlers } from '../types';
import { deleteSession } from '../../db/methods';
import { getCookie } from '../../utils/getCookie';
import { setCookie } from '../../utils/setCookie';

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
