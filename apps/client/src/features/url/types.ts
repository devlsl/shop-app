import { pages } from './consts/pages';

export type UrlState = { params: Record<string, string | undefined> };

export type Page = (typeof pages)[number];
