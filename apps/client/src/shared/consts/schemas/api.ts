import { apiSchema } from '@shop/shared';
import { ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';

export const apiPayloadSchemas = Object.fromEntries(
    Object.entries(apiSchema as ActionOptionsMap).map(([name, options]) => [
        name,
        options.payload,
    ]),
) as {
    // @ts-expect-error
    [Key in keyof typeof apiSchema]: undefined extends (typeof apiSchema)[Key]['payload']
        ? undefined
        : // @ts-expect-error
          (typeof apiSchema)[Key]['payload'];
};

export type ApiPayloadSchemas = {
    [Key in keyof typeof apiPayloadSchemas]: undefined extends (typeof apiPayloadSchemas)[Key]
        ? undefined
        : // @ts-expect-error
          z.infer<(typeof apiPayloadSchemas)[Key]>;
};

export const apiReturnSchemas = Object.fromEntries(
    Object.entries(apiSchema as ActionOptionsMap).map(([name, options]) => [
        name,
        options.return,
    ]),
) as {
    // @ts-expect-error
    [Key in keyof typeof apiSchema]: undefined extends (typeof apiSchema)[Key]['return']
        ? undefined
        : // @ts-expect-error
          (typeof apiSchema)[Key]['return'];
};

export type ApiReturnSchemas = {
    [Key in keyof typeof apiReturnSchemas]: undefined extends (typeof apiReturnSchemas)[Key]
        ? undefined
        : // @ts-expect-error
          z.infer<(typeof apiReturnSchemas)[Key]>;
};
