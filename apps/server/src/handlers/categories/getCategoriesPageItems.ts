import { ActionError } from 'ts-api-generator';
import { Handlers, HandlersProps } from '../../types';

export default (props: HandlersProps): Handlers['getCategoriesPageItems'] =>
    async ({ categoryId }) => {
        const categories = await props.storage.category.get();

        const category =
            categoryId === null
                ? null
                : categories.find((c) => c.id === categoryId);

        if (category === undefined) return new ActionError('CategoryNotFound');

        const backCategoryId =
            category === null ? undefined : category.parentCategoryId;

        const products = await props.storage.product.get();

        const categoriesHaveProductsMap: Record<string, true | undefined> =
            Object.fromEntries(
                products.map((product) => [product.categoryId, true]),
            );

        const withNestedCategories = Object.fromEntries(
            categories.reduce<[string, true | undefined][]>(
                (prev, cur) =>
                    cur.parentCategoryId !== null
                        ? [[cur.parentCategoryId, true], ...prev]
                        : prev,
                [],
            ),
        );

        const catalogCategories = categories.filter(
            (c) => c.parentCategoryId === categoryId,
        );

        return {
            id: categoryId,
            backCategoryId,
            haveProducts: categoriesHaveProductsMap[categoryId ?? ''] ?? false,
            items: catalogCategories.map((c) => ({
                id: c.id,
                imageUrl: `${props.STATIC_SERVER_HOSTNAME}/${c.imageId}`,
                name: c.name,
                haveProducts: categoriesHaveProductsMap[c.id] ?? false,
                haveNestedCategories: withNestedCategories[c.id] ?? false,
            })),
        };
    };
