import { HandlersTypeGenerator } from 'ts-api-generator';
import { apiSchema } from '@shop/shared';
import {
    DbEntitiesTypeGenerate,
    DbServiceTypeGenerate,
} from './utils/createDb';
import { dbSchema } from './dbSchema';

export type Handlers = HandlersTypeGenerator<typeof apiSchema>;
export type DbService = DbServiceTypeGenerate<typeof dbSchema>;
export type DbEntities = DbEntitiesTypeGenerate<typeof dbSchema>;
