import { createDefaultHttpClient } from 'ts-api-generator';
import { apiSchema } from '@shop/shared';

export const api = createDefaultHttpClient('http://localhost:3000', apiSchema);
