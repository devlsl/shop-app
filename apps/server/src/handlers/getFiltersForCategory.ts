import { Handlers } from './types';

export const getFiltersForCategory: Handlers['getFiltersForCategory'] = async (
    payload,
) => {
    return [{ type: 'boolean', key: 'dads' }];
};
