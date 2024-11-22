import { HandlersTypeGenerator } from 'ts-api-generator';
import { apiSchema } from '@shop/shared';
import { envKeys } from './consts';
import { storageSchema } from './storageSchema';
import {
    StorageEntitiesTypeGenerate,
    StorageServiceTypeGenerate,
} from './utils/createStorageService';

export type StorageEntities = StorageEntitiesTypeGenerate<typeof storageSchema>;
export type StorageService = StorageServiceTypeGenerate<typeof storageSchema>;

type Services = {
    storage: StorageService;
};

type Env = {
    [Key in (typeof envKeys)[number]]: string;
};

export type HandlersProps = Services & Env;

export type Handlers = HandlersTypeGenerator<typeof apiSchema>;
