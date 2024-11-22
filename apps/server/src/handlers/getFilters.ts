import { Handlers, HandlersProps } from '../types';

export default (props: HandlersProps): Handlers['getFilters'] =>
    async (payload) =>
        (await props.storage.product.get())
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
