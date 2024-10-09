import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const writeJson = async (filepath: string, data: unknown) => {
    const jsondata = JSON.stringify(data);
    try {
        await writeFile(filepath, jsondata);
    } catch {
        try {
            await mkdir(path.dirname(filepath));
            await writeFile(filepath, jsondata);
        } catch {}
    }
};

const readJson = async <T extends z.ZodTypeAny>(
    filepath: string,
    schema: T,
    defaultFalue: z.infer<T>,
): Promise<z.infer<T>> => {
    try {
        const data = await readFile(filepath, 'utf-8');
        const json = JSON.parse(data);
        return schema.parse(json) as z.infer<T>;
    } catch {
        await writeJson(filepath, '');
        return defaultFalue;
    }
};

export const createDb = <Config extends Record<string, z.ZodTypeAny>>(
    dirname: string,
    config: Config,
) =>
    Object.fromEntries(
        Object.entries(config).map(([name, schema]) => [
            name,
            {
                get: async () =>
                    readJson(path.join(dirname, `${name}.json`), schema, []),
                set: async (data: z.infer<typeof schema>) =>
                    writeJson(path.join(dirname, `${name}.json`), data),
            },
        ]),
    ) as {
        [Key in keyof Config]: {
            get: () => Promise<z.infer<Config[Key]>>;
            set: (value: z.infer<Config[Key]>) => Promise<void>;
        };
    };
