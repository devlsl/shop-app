export const generateRandomNumberString = (
    length: number,
    min: number,
    max: number,
) => {
    let result = '';

    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * max) + min;
        result += digit.toString();
    }

    return result;
};
