import { pages } from './consts/pages';

export type UrlState = { params: Record<string, string | undefined> };

export type Page = (typeof pages)[number];

export type LinkProps<Props> = Omit<Props, 'href' | 'onClick'> & {
    onWillRedirect?: () => Promise<void> | void;
    to: [Page, Record<string, string | undefined | null>] | [Page];
};
