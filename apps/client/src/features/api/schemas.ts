import { apiSchema } from '@shop/shared';
import {
    getApiPayloadSchemas,
    getApiReturnDataSchemas,
} from 'ts-api-generator';

export const apiPayloadSchemas = getApiPayloadSchemas(apiSchema);
export const apiReturnDataSchemas = getApiReturnDataSchemas(apiSchema);
