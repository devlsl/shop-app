import { ActionError } from 'ts-api-generator';
import { DbEntities, DbService, Handlers } from '../types';

type Dependencies = {
    db: DbService;
};

export default ({ db }: Dependencies): Handlers['getCategoryPath'] =>
    async ({ categoryId }) => {
        if (categoryId === null) return [];
        const categories = await db.category.get();
        const categoriesMap: Record<
            string,
            DbEntities['category'] | undefined
        > = Object.fromEntries(categories.map((c) => [c.id, c]));
        const category = categoriesMap[categoryId];
        if (category === undefined) return new ActionError('CategoryNotFound');

        let path = [category];
        while (path[0].parentCategoryId !== null) {
            const parent = categoriesMap[path[0].parentCategoryId!]!;
            path.unshift(parent);
        }

        return path.map((c) => ({ id: c.id, name: c.name }));
    };
