import { Products } from '../../db/types';
import { generateId } from '../../utils/generateId';
import { Handlers } from '../types';

export const todo: Handlers['todo'] = async () => {
    // const products: Products = [
    //     {
    //         id: generateId(),
    //         categoryId: '1333624c-0498-4ebe-8952-b502aa9e25c4',
    //         name: 'Смартфон HONOR 200 Pro 12 ГБ + 512 ГБ («Океанический голубой» | Ocean Cyan)',
    //         price: '',
    //         leftInStock: 0,
    //         features: {
    //             'бренд': 'HONOR',
    //             'операционная система': 'Android',
    //             'диагональ экрана': '6.78"',
    //             'цвет': 'океанический голубой',
    //             'объём встроенной памяти': '512 Гб',
    //             'ёмкость аккумулятора': '5200 мАч',
    //             'беспроводная зарядка': 'есть',
    //             'объём оперативной памяти': '12 Гб',
    //             'бесконтактная оплата': 'есть',
    //             'материал корпуса': 'пластик',
    //             'разъём для наушников': 'USB Type-C',
    //             'количество камер': '3',
    //             'частота обновления экрана': '120 Гц',
    //             'слот для карты памяти': 'нет',
    //             'количество SIM-карты': '2',
    //             'поддержка e-sim': 'нет',
    //         },
    //         media: {
    //             main: [
    //                 {url: 'https://i.ibb.co/f8B8xB8/df28b206-e692-4112-ac21-29e963a448cc.png'}
    //             ],
    //             preview: [{url: 'https://i.ibb.co/f8B8xB8/df28b206-e692-4112-ac21-29e963a448cc.png'}, {url: ''}],
    //         }
    // ];
};
