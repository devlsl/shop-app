import { create } from 'zustand';
import {
    createUrlService,
    initUrlState,
    UrlState,
} from '../modules/urlService';

const useUrlState = create<UrlState>(initUrlState);

const urlService = createUrlService(useUrlState.setState);

type UseUrl = {
    (): UrlState;
    <U>(selector: (state: UrlState) => U): U;
} & typeof urlService;

export const useUrl = Object.assign(useUrlState, urlService) as UseUrl;
