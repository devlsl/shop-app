import { ServerResponse } from 'http';

type CookieOptions = {
    maxAge?: number; // В секундах
    expires?: Date; // Дата истечения
    httpOnly?: boolean; // Запрет доступа через JavaScript
    secure?: boolean; // Кука будет передаваться только по HTTPS
    sameSite?: 'Lax' | 'Strict' | 'None'; // Политика отправки куки
    path?: string; // Путь, для которого кука доступна
};

export const setCookie = (
    response: ServerResponse,
    key: string,
    value: string,
    options?: CookieOptions,
) => {
    let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;

    if (options) {
        if (options.maxAge) {
            cookieString += ` Max-Age=${options.maxAge};`;
        }
        if (options.expires) {
            cookieString += ` Expires=${options.expires.toUTCString()};`;
        }
        if (options.httpOnly) {
            cookieString += ' HttpOnly;';
        }
        if (options.secure) {
            cookieString += ' Secure;';
        }
        if (options.sameSite) {
            cookieString += ` SameSite=${options.sameSite};`;
        }
        if (options.path) {
            cookieString += ` Path=${options.path};`;
        }
    }
    const prevCookies = response.getHeader('Set-Cookie');

    if (prevCookies === undefined) {
        response.setHeader('Set-Cookie', [cookieString]);
    } else {
        response.setHeader('Set-Cookie', [
            ...(prevCookies instanceof Array
                ? prevCookies.map((a) => a.toString())
                : [prevCookies.toString()]),
            cookieString,
        ]);
    }
};
