import { useFiltersState } from './state';

export const toggleAreShownProductFilters = () =>
    useFiltersState.setState((prev) => ({
        ...prev,
        areShown: !prev.areShown,
    }));
