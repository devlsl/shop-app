import { SchemaMapType } from 'ts-api-generator';
import { apiPayloadSchemas, apiReturnDataSchemas } from './schemas';

export type ApiPayload = SchemaMapType<typeof apiPayloadSchemas>;
export type ApiReturnData = SchemaMapType<typeof apiReturnDataSchemas>;
