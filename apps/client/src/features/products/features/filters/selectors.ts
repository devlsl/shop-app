import { useFiltersState } from './state';

export const useAreShownProductFilters = () =>
    useFiltersState((state) => state.areShown);
