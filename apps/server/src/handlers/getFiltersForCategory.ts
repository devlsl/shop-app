import { DbService, Handlers } from '../types';

type Dependencies = {
    db: DbService;
};
export default ({ db }: Dependencies): Handlers['getFiltersForCategory'] =>
    async (payload) =>
        (await db.product.get())
            .filter((p) => p.categoryId === payload.categoryId)
            .flatMap((p) => Object.entries(p.features))
            .reduce<Record<string, string[] | undefined>>(
                (result, [key, value]) => ({
                    ...result,
                    [key]: (result[key] ?? [])
                        .filter((v) => v !== value)
                        .concat(value),
                }),
                {},
            );
