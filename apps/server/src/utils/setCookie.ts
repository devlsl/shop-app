import { ServerResponse } from 'http';

type CookieOptions = {
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
    path?: string;
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
