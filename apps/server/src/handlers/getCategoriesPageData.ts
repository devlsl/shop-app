import { ActionError } from 'ts-api-generator';
import { db } from '../db';
import { Handlers } from './types';

type Options = {
    staticServerHostname: string;
};

export default (options: Options): Handlers['getCategoriesPageData'] =>
    async ({ categoryId }) => {
        const categories = await db.categories.get();

        const category =
            categoryId === null
                ? null
                : categories.find((c) => c.id === categoryId);

        if (category === undefined) return new ActionError('CategoryNotFound');

        const backCategoryId =
            category === null ? undefined : category.parentCategoryId;

        const products = await db.products.get();

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
                imageUrl: `${options.staticServerHostname}/${c.imageId}`,
                name: c.name,
                haveProducts: categoriesHaveProductsMap[c.id] ?? false,
                haveNestedCategories: withNestedCategories[c.id] ?? false,
            })),
        };
    };
// (await db.categories.get()).filter(
//     (c) => c.parentCategoryId === parentId,
// );
// async ({ parentId }) => {
//     const electronikaId = generateId();
//     const obyvId = generateId();

//     const newCategories: Category[] = [
//         {
//             id: electronikaId,
//             imageUrl: 'https://i.ibb.co/YhxSgJX/phones.png',
//             name: 'Электроника',
//             parentCategoryId: null,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/YhxSgJX/phones.png',
//             name: 'Смартфоны',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/58D480m/noytbyki.png',
//             name: 'Ноутбуки',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/YhxSgJX/phones.png',
//             name: 'Смартфоны',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/vLXK3GK/plansheti.png',
//             name: 'Планшеты',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/yWBgM5F/televizori.png',
//             name: 'Телевизоры',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/PxMb9k0/ymnie-chasi-i-brasleti.png',
//             name: 'Умные часы\nи браслеты',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/pKkSn0g/headphones.png',
//             name: 'Наушники',
//             parentCategoryId: electronikaId,
//         },
//         {
//             id: obyvId,
//             imageUrl: 'https://i.ibb.co/YTG6Rdz/obyv.png',
//             name: 'Обувь',
//             parentCategoryId: null,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/Qc0Fp8j/kedi.png',
//             name: 'Кеды',
//             parentCategoryId: obyvId,
//         },
//         {
//             id: generateId(),
//             imageUrl: 'https://i.ibb.co/vxX00Qr/krosovki.png',
//             name: 'Кроссовки',
//             parentCategoryId: obyvId,
//         },
//     ];

//     await db.categories.set(newCategories);
//     return newCategories;
// };
