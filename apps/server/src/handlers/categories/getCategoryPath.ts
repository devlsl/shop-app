import { ActionError } from 'ts-api-generator';
import { db } from '../../db/instance';
import { Category } from '../../db/types';
import { Handlers } from '../types';

export const getCategoryPath: Handlers['getCategoryPath'] = async ({
    categoryId,
}) => {
    if (categoryId === null) return [];
    const categories = await db.categories.get();
    const categoriesMap: Record<string, Category | undefined> =
        Object.fromEntries(categories.map((c) => [c.id, c]));
    const category = categoriesMap[categoryId];
    if (category === undefined) return new ActionError('CategoryNotFound');

    let path = [category];
    while (path[0].parentCategoryId !== null) {
        const parent = categoriesMap[path[0].parentCategoryId!]!;
        path.unshift(parent);
    }

    return path.map((c) => ({ id: c.id, name: c.name }));
};
