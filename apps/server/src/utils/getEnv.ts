export const getEnv = <Keys extends readonly string[]>(keys: Keys) =>
    Object.fromEntries(
        keys.map((key) => {
            if (process.env[key] === undefined) {
                (function () {
                    throw new Error('');
                })();
            }
            return [key, process.env[key]];
        }),
    ) as Record<Keys[number], string>;
