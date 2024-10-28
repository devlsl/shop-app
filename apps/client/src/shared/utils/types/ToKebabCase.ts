export type ToKebabCase<
    T extends string,
    A extends string = '',
> = T extends `${infer F}${infer R}`
    ? ToKebabCase<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
    : A;
