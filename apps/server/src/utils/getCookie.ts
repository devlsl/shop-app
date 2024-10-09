import { IncomingMessage } from 'http';

export const getCookie = (request: IncomingMessage, key: string) => {
    const cookieHeader = request.headers.cookie;
    const cookies: Record<string, string | undefined> = {};
    const cookieArray = cookieHeader?.split('; ') ?? [];
    cookieArray.forEach((cookie) => {
        const [name, value] = cookie.split('=');
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    });
    return cookies[key];
};
