import { apiSchema } from '@shop/shared';
import { ActionOptionsMap } from 'ts-api-generator';

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
