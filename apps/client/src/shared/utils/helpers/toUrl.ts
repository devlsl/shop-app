export const toUrl = (
    pathname: string,
    searchParams: Record<string, string | undefined | null> = {},
    hash: string = '',
) => {
    const searchEntries = Object.entries(searchParams).filter(
        ([, value]) => value !== null && value !== undefined,
    );
    return `${pathname}${searchEntries.length === 0 ? '' : `?${searchEntries.map(([key, value]) => `${key}=${value}`).join('&')}`}${hash === '' ? '' : `#${hash}`}`;
};
