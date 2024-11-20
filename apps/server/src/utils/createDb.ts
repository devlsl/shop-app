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
    defaultValue: z.infer<T>,
): Promise<z.infer<T>> => {
    try {
        const data = await readFile(filepath, 'utf-8');
        const json = JSON.parse(data);
        return schema.parse(json) as z.infer<T>;
    } catch {
        await writeJson(filepath, '');
        return defaultValue;
    }
};

type DbSchema = Record<string, z.ZodTypeAny>;

export type DbServiceTypeGenerate<T extends DbSchema> = {
    [Key in keyof T]: {
        get: () => Promise<z.infer<T[Key]>[]>;
        set: (value: z.infer<T[Key]>[]) => Promise<void>;
    };
};

export type DbEntitiesTypeGenerate<T extends DbSchema> = {
    [Key in keyof T]: z.infer<T[Key]>;
};

export const createDb = <T extends DbSchema>(dirname: string, schema: T) =>
    Object.fromEntries(
        Object.entries(schema).map(([name, entitySchema]) => {
            return [
                name,
                {
                    get: async () =>
                        readJson(
                            path.join(dirname, `${name}.json`),
                            entitySchema.array(),
                            [],
                        ),
                    set: async (data: z.infer<typeof entitySchema>[]) =>
                        writeJson(path.join(dirname, `${name}.json`), data),
                },
            ];
        }),
    ) as DbServiceTypeGenerate<T>;
