import { HandlersTypeGenerator } from 'ts-api-generator';
import { apiSchema } from '@shop/shared';

export type Handlers = HandlersTypeGenerator<typeof apiSchema>;
