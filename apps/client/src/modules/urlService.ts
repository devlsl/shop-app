export interface UrlState {
    page: string;
    search: Record<string, string | undefined>;
}

const createUrlServiceCreator =
    (
        getCurrentPathname: () => string,
        getCurrentHref: () => string,
        getCurrentSearchParams: () => URLSearchParams,
    ) =>
    (setState: (state: Partial<UrlState>) => void) => {
        const navigate = (urn: string) => {
            const url = new URL(urn, 'http://b.b');
            history.pushState(urn, '', urn);
            setState({
                page: url.pathname,
                search: Object.fromEntries(url.searchParams.entries()),
            });
        };

        const setSearchParam = (key: string, value: string | null) => {
            const page = getCurrentPathname();
            const searchParams = getCurrentSearchParams();

            if (value === null) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, value);
            }
            const search = searchParams.toString();
            navigate(page + (search && '?' + search));
        };

        const setSearchParams = (
            params: { key: string; value: string | null }[],
        ) => {
            const page = getCurrentPathname();
            const searchParams = getCurrentSearchParams();

            params.forEach(({ value, key }) => {
                if (value === null) {
                    searchParams.delete(key);
                } else {
                    searchParams.set(key, value);
                }
            });
            const search = searchParams.toString();
            navigate(page + (search && '?' + search));
        };

        const handlePopState = () => {
            const href = getCurrentHref();
            const url = new URL(href);
            setState({
                page: url.pathname,
                search: Object.fromEntries(url.searchParams.entries()),
            });
        };

        return {
            navigate,
            setSearchParam,
            setSearchParams,
            handlePopState,
        };
    };

const getCurrentPathname = () => window.location.pathname;
const getCurrentHref = () => window.location.href;
const getCurrentSearchParams = () => new URL(getCurrentHref()).searchParams;

export const initUrlState = (): UrlState => ({
    page: window.location.pathname,
    search: Object.fromEntries(getCurrentSearchParams().entries()),
});

export const createUrlService = createUrlServiceCreator(
    getCurrentPathname,
    getCurrentHref,
    getCurrentSearchParams,
);
