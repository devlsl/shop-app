import { readFile } from 'fs/promises';

export const getEnv = async (
    path: string,
    requiredKeys: string[] | readonly string[],
) => {
    const allVars = Object.fromEntries(
        (await readFile(path, 'utf-8'))
            .toString()
            .replaceAll('\r\n', '\n')
            .split('\n')
            .filter((l) => l !== '')
            .map((l) => {
                const lineItems = l.split('=');
                const key = lineItems[0];
                let value = lineItems[1];
                if (value.charAt(0) === '"') value = value.slice(1);
                if (value.charAt(value.length - 1) === '"')
                    value = value.slice(0, -1);
                return [key, value];
            }),
    );

    requiredKeys.forEach(
        (key) =>
            allVars[key] === undefined &&
            (function () {
                throw new Error(
                    `apps/client: .env read error: variable with key ${key} was not found`,
                );
            })(),
    );

    return allVars;
};
