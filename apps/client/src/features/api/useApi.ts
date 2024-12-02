import { createReactUseApi } from 'ts-api-generator';
import { apiClientOptions } from './apiClientOptions';

export const useApi = createReactUseApi(apiClientOptions);
