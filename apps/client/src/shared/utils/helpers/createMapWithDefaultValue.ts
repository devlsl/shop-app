export const createMapWithDefaultValue =
    <Key extends string, Value>(map: Record<Key, Value>, defaultValue: Value) =>
    (key: string) =>
        map[key as Key] ?? defaultValue;
