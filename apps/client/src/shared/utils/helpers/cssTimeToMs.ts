export const cssTimeToMs = (cssTime: string) =>
    parseFloat(cssTime) * (/\ds$/.test(cssTime) ? 1000 : 1);
