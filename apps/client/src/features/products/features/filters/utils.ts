import { apiPayloadSchemas } from '../../../api';
import { getNavigationParam } from '../../../navigation';

export const parseProductFilters = () => {
    try {
        return apiPayloadSchemas.getProductsPageItems
            .required()
            .shape.filters.parse(
                JSON.parse(getNavigationParam('filters') ?? ''),
            );
    } catch (error) {
        return {};
    }
};

export const parseProductSorting = () => {
    try {
        return apiPayloadSchemas.getProductsPageItems
            .required()
            .shape.sort.parse(JSON.parse(getNavigationParam('sorting') ?? ''));
    } catch (error) {
        return {};
    }
};
