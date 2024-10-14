import { apiSchema } from '@shop/shared';
import { createUseApi } from './createUseApi';

export const useApi = createUseApi(
    'http://localhost:3000',
    apiSchema,
    'refreshAuth',
);
