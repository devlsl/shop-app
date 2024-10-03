import {
    ActionOptions,
    ActionOptionsMap,
    ClientTypeGenerator,
} from 'ts-api-generator';
import { Either, left, right } from '@sweet-monads/either';
import { apiSchema } from '@shop/shared';
import { z } from 'zod';

const parseResponse = (
    json: any,
    options: ActionOptions,
): Either<
    'Unauthorized' | 'RequiredUnauthorized' | 'NetworkError' | void,
    any
> => {
    if (json.error !== undefined && typeof json.error === 'string') {
        if (json.error === 'Unauthorized') {
            // console.log(401, '$$$Нормальное поведение(false) Unauthorized')
            return left('Unauthorized');
        }
        if (json.error === 'RequiredUnauthorized') {
            // console.log(401, '$$$Нормальное поведение(false) RequiredUnauthorized')
            return left('RequiredUnauthorized');
        }
    }

    const serviceErrors = [
        'NoUrl',
        'UnknownAction',
        'BodyReadError',
        'NotJsonBody',
        'BodyDoesNotMatchTheSchema',
        'ServerError',
    ];

    const maybeReplyWithStatus = z
        .object({ success: z.boolean() })
        .safeParse(json);
    if (!maybeReplyWithStatus.success) {
        // console.log(1, 'Нет поля success, а все ответы от моего api должны его содержать')
        return left('NetworkError');
    }
    if (maybeReplyWithStatus.data.success === false) {
        if (
            json.error !== undefined &&
            typeof json.error === 'string' &&
            serviceErrors.includes(json.error)
        ) {
            // console.log(100, '$$$Нормальное поведение(false), вернулась сервисная ошибка от сервера', json.error)
            return left('NetworkError');
        }
        // необходима проврека на сервисные ошибки кроме ошибок авторизации, они проверяются в начале функции test

        if (options.errors instanceof Array && options.errors.length > 0) {
            if (json.error === undefined || typeof json.error !== 'string') {
                // console.log(2, 'поле success = false, но экшн требует вернуть кастомную ошибку, а поля error нет')
                return left('NetworkError');
            }
            if (options.errors.includes(json.error)) {
                // console.log(3, '$$$Нормальное поведение(false): вернулась кастомная ошибка', json.error)
                return left(json.error);
            } else {
                // console.log(4, 'поле success = false, но экшн требует вернуть кастомную ошибку, а поля error есть, но не соответсвует схеме')
                return left('NetworkError');
            }
        } else {
            // console.log(5, '$$$Нормальное поведение(false): вернулася success: false без кастомных ошибок (так как экшн не имеет поля errors)', json.error)
            return left(undefined);
        }
    }
    if (options.return === undefined) {
        // console.log(6, '$$$Нормальное поведение(true), экшн не ожидал возврата данных (нет поля return)')
        return right(undefined);
    } else {
        if (json.data === undefined) {
            // console.log(7, 'вернулся success true, и ожидались данные (экшн имеет поле return), но поля data в ответе нет')
            return left('NetworkError');
        }
        const maybeData = options.return.safeParse(json.data);
        if (!maybeData.success) {
            // console.log(8, 'вернулся success true, и ожидались данные (экшн имеет поле return), но поле data не соответствует схеме')
            return left('NetworkError');
        }
        // console.log(9, '$$$Нормальное поведение(true), ожидались данные (экшн имеет поле return), поле data соответствует схеме')
        return right(maybeData.data);
    }
};

const createClient = <Config extends ActionOptionsMap>(
    url: string,
    config: Config,
): ClientTypeGenerator<Config> => {
    return Object.fromEntries(
        Object.entries(config).map(([actionName, options]) => {
            return [
                actionName,
                async (...args: unknown[]) => {
                    try {
                        const response = await fetch(url + '/' + actionName, {
                            method: 'POST',
                            credentials: 'include',
                            body: JSON.stringify(args[0]),
                        });
                        if (!response.ok) {
                            return left('NetworkError');
                        }
                        const json = await response.json();

                        const parsedResponse = parseResponse(json, options);

                        if (
                            parsedResponse.isLeft() &&
                            parsedResponse.value === 'Unauthorized'
                        ) {
                            const response = await fetch(
                                url + '/' + actionName,
                                {
                                    method: 'POST',
                                    credentials: 'include',
                                    body: JSON.stringify(args[0]),
                                },
                            );
                            if (!response.ok) {
                                return left('NetworkError');
                            }
                            const json = await response.json();

                            return parseResponse(json, options);
                        }
                        return parsedResponse;
                    } catch (error) {
                        return left('NetworkError');
                    }
                },
            ];
        }),
    ) as ClientTypeGenerator<Config>;
};

export const api = createClient('http://localhost:3000', apiSchema);
