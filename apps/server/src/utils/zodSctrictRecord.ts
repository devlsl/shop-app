import { z } from 'zod';

export function isPlainObject(
    value: unknown,
): value is Record<string | number | symbol, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof Date)
    );
}

export function zodStrictRecord<
    K extends z.ZodType<string | number | symbol>,
    V extends z.ZodTypeAny,
>(zKey: K, zValue: V) {
    return z.custom<Record<z.infer<K>, z.infer<V>>>((input: unknown) => {
        return (
            isPlainObject(input) &&
            Object.entries(input).every(
                ([key, value]) =>
                    zKey.safeParse(key).success &&
                    zValue.safeParse(value).success,
            )
        );
    }, 'zodStrictRecord: error');
}
