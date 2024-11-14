import { Either, isEither, left, right } from '@sweet-monads/either';
import { useState } from 'react';
import { ActionOptions, ActionOptionsMap } from 'ts-api-generator';
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
            console.log('a');

            return left('Unauthorized');
        }
        if (json.error === 'RequiredUnauthorized') {
            console.log('b');

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
        console.log('c');
        return left('NetworkError');
    }
    if (maybeReplyWithStatus.data.success === false) {
        if (
            json.error !== undefined &&
            typeof json.error === 'string' &&
            serviceErrors.includes(json.error)
        ) {
            console.log('d');
            return left('NetworkError');
        }

        if (options.errors instanceof Array && options.errors.length > 0) {
            if (json.error === undefined || typeof json.error !== 'string') {
                console.log('e');
                return left('NetworkError');
            }
            if (options.errors.includes(json.error)) {
                console.log('f');

                return left(json.error);
            } else {
                console.log('g');

                return left('NetworkError');
            }
        } else {
            console.log('h');
            return left(undefined);
        }
    }
    if (options.return === undefined) {
        return right(undefined);
    } else {
        if (json.data === undefined) {
            console.log('i');

            return left('NetworkError');
        }
        const maybeData = options.return.safeParse(json.data);
        if (!maybeData.success) {
            console.log('j', maybeData.error);
            return left('NetworkError');
        }
        return right(maybeData.data);
    }
};

const invoke = async (
    url: string,
    actionName: string,
    options: ActionOptions,
    payload?: unknown,
) => {
    const response = await fetch(url + '/' + (actionName as string), {
        method: 'POST',
        credentials: 'include',
        ...(payload ? { body: JSON.stringify(payload) } : {}),
    });
    if (!response.ok) {
        console.log('1.1.1');
        return left('NetworkError');
    }
    const json = await response.json();

    return parseResponse(json, options);
};

const invokeWithRefreshing = async (
    url: string,
    actionName: string,
    options: ActionOptions,
    payload: unknown,
    refreshActionName: string,
    refreshCredentialsIfUnauthorized: boolean = true,
) => {
    try {
        const maybeResponse = await invoke(url, actionName, options, payload);
        if (!refreshCredentialsIfUnauthorized) return maybeResponse;

        if (maybeResponse.isLeft() && maybeResponse.value === 'Unauthorized') {
            const maybeRefreshed = await invoke(
                url,
                refreshActionName,
                options,
                payload,
            );

            if (
                maybeRefreshed.isLeft() &&
                maybeRefreshed.value === 'Unauthorized'
            ) {
                return left('Unauthorized');
            } else {
                return invoke(url, actionName, options, payload);
            }
        }
        return maybeResponse;
    } catch (error) {
        console.log(error);
        return left('NetworkError');
    }
};

export type FetchState<Error, Data> =
    | {
          status: 'idle';
          error: null;
          data: null;
          cash: null;
      }
    | {
          status: 'loading';
          error: null;
          data: null;
          cash: Data | null;
      }
    | {
          status: 'error';
          error: Error | 'NotLogicError';
          data: null;
          cash: Data | null;
      }
    | {
          status: 'success';
          error: null;
          data: Data;
          cash: Data;
      };

export type CallReturn<Error, Data> = Either<Error | 'NotLogicError', Data>;

export const createUseApi = <Config extends ActionOptionsMap>(
    url: string,
    config: Config,
    refreshActionName: keyof Config,
    onError: (
        type: 'unauthorized' | 'requiredUnauthorized' | 'network',
    ) => void,
) => {
    const useApi = <
        ActionName extends keyof Config,
        Data = undefined extends Config[ActionName]['return']
            ? undefined
            : // @ts-expect-error
              z.infer<Config[ActionName]['return']!>,
        Return = Promise<
            CallReturn<
                Config[ActionName]['errors'] extends readonly string[]
                    ? Config[ActionName]['errors'][number]
                    : undefined,
                Data
            >
        >,
    >(
        actionName: ActionName,
        refreshCredentialsIfUnauthorized: boolean = true,
    ) => {
        const options = config[actionName];
        const [fetchState, setFetchState] = useState<
            FetchState<
                Config[ActionName]['errors'] extends readonly string[]
                    ? Config[ActionName]['errors'][number]
                    : undefined,
                Data
            >
        >({ status: 'idle', data: null, error: null, cash: null });

        const call = (async (payload: unknown) => {
            setFetchState((prev) => ({
                status: 'loading',
                data: null,
                error: null,
                cash: prev.cash,
            }));
            const response = await invokeWithRefreshing(
                url,
                actionName as string,
                options,
                payload,
                refreshActionName as string,
                refreshCredentialsIfUnauthorized,
            );
            if (!isEither(response)) {
                setFetchState((prev) => ({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                    cash: prev.cash,
                }));
                console.log(1);
                onError('network');
                return left('NotLogicError');
            }
            if (response.isRight()) {
                setFetchState({
                    status: 'success',
                    data: response.value as Data,
                    error: null,
                    cash: response.value as Data,
                });
                return right(response.value);
            }
            if (response.value === 'Unauthorized') {
                setFetchState((prev) => ({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                    cash: prev.cash,
                }));
                console.log(2);
                onError('unauthorized');
                return left('NotLogicError');
            }
            if (response.value === 'RequiredUnauthorized') {
                setFetchState((prev) => ({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                    cash: prev.cash,
                }));
                console.log(3);

                onError('requiredUnauthorized');
                return left('NotLogicError');
            }
            if (response.value === 'NetworkError') {
                setFetchState((prev) => ({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                    cash: prev.cash,
                }));
                console.log(4.421);
                onError('network');
                return left('NotLogicError');
            }

            setFetchState({
                status: 'error',
                data: null,
                // @ts-expect-error
                error: response.value,
                cash: null,
            });
            return left(response.value);
        }) as undefined extends Config[ActionName]['payload']
            ? () => Return
            : (
                  // @ts-expect-error
                  payload: z.infer<Config[ActionName]['payload']!>,
              ) => Return;

        return {
            ...fetchState,
            call,
        };
    };

    const apiAction = <
        ActionName extends keyof Config,
        Data = undefined extends Config[ActionName]['return']
            ? undefined
            : // @ts-expect-error
              z.infer<Config[ActionName]['return']!>,
        Return = Promise<
            CallReturn<
                Config[ActionName]['errors'] extends readonly string[]
                    ? Config[ActionName]['errors'][number]
                    : undefined,
                Data
            >
        >,
    >(
        actionName: ActionName,
        refreshCredentialsIfUnauthorized: boolean = true,
    ) => ({
        call: (async (payload: unknown) => {
            const options = config[actionName];

            const response = await invokeWithRefreshing(
                url,
                actionName as string,
                options,
                payload,
                refreshActionName as string,
                refreshCredentialsIfUnauthorized,
            );
            if (!isEither(response)) {
                console.log(5);

                onError('network');
                return left('NotLogicError');
            }
            if (response.isRight()) return right(response.value);
            if (response.value === 'Unauthorized') {
                console.log(6);

                onError('unauthorized');
                return left('NotLogicError');
            }
            if (response.value === 'RequiredUnauthorized') {
                console.log(7);

                onError('requiredUnauthorized');
                return left('NotLogicError');
            }
            if (response.value === 'NetworkError') {
                console.log(8);

                onError('network');
                return left('NotLogicError');
            }

            return left(response.value);
        }) as undefined extends Config[ActionName]['payload']
            ? () => Return
            : (
                  // @ts-expect-error
                  payload: z.infer<Config[ActionName]['payload']!>,
              ) => Return,
    });

    return { useApi, apiAction };
};
