import { generateRandomNumberString } from '../../utils/generateRandomNumberString';

export const generateOrderNumber = (arr: string[]): string => {
    let newString = generateRandomNumberString(1, 1, 9);
    let sevenDigits = '';
    do {
        sevenDigits = generateRandomNumberString(7, 0, 9);
    } while (arr.includes(newString.concat(sevenDigits)));
    return newString.concat(sevenDigits);
};
