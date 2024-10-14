import { Either, isEither, left, right } from '@sweet-monads/either';
import { useState } from 'react';
import { ActionOptions, ActionOptionsMap } from 'ts-api-generator';
import { z } from 'zod';
import { useAppState } from './useAppState';
import { useUser } from './useUser';

const parseResponse = (
    json: any,
    options: ActionOptions,
): Either<
    'Unauthorized' | 'RequiredUnauthorized' | 'NetworkError' | void,
    any
> => {
    if (json.error !== undefined && typeof json.error === 'string') {
        if (json.error === 'Unauthorized') {
            return left('Unauthorized');
        }
        if (json.error === 'RequiredUnauthorized') {
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
        return left('NetworkError');
    }
    if (maybeReplyWithStatus.data.success === false) {
        if (
            json.error !== undefined &&
            typeof json.error === 'string' &&
            serviceErrors.includes(json.error)
        ) {
            return left('NetworkError');
        }

        if (options.errors instanceof Array && options.errors.length > 0) {
            if (json.error === undefined || typeof json.error !== 'string') {
                return left('NetworkError');
            }
            if (options.errors.includes(json.error)) {
                return left(json.error);
            } else {
                return left('NetworkError');
            }
        } else {
            return left(undefined);
        }
    }
    if (options.return === undefined) {
        return right(undefined);
    } else {
        if (json.data === undefined) {
            return left('NetworkError');
        }
        const maybeData = options.return.safeParse(json.data);
        if (!maybeData.success) {
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
    refreshAuth: boolean = true,
) => {
    try {
        const maybeResponse = await invoke(url, actionName, options, payload);
        if (!refreshAuth) return maybeResponse;

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
        return left('NetworkError');
    }
};

export type FetchState<Error, Data> =
    | {
          status: 'idle';
          error: null;
          data: null;
      }
    | {
          status: 'loading';
          error: null;
          data: null;
      }
    | {
          status: 'error';
          error: Error | 'NotLogicError';
          data: null;
      }
    | {
          status: 'success';
          error: null;
          data: Data;
      };

const handleNetworkError = () =>
    useAppState.setState((state) => ({
        errors: [...state.errors, 'network error'],
    }));

const handleUnauthorizedError = (promptToSignIn: boolean = true) => {
    useUser.setState({ user: null });
    if (promptToSignIn) useAppState.setState({ showSignInView: true });
};

const handleRequiredUnauthorizedError = () =>
    useAppState.setState((state) => ({
        errors: [...state.errors, 'need to sign out'],
    }));

export const createUseApi =
    <Config extends ActionOptionsMap>(
        url: string,
        config: Config,
        refreshActionName: keyof Config,
    ) =>
    <
        // Payload = undefined extends Config[ActionName]['payload'] ? z.infer<Config[ActionName]['payload']!> : undefined,
        ActionName extends keyof Config,
        Data = undefined extends Config[ActionName]['return']
            ? undefined
            : // @ts-expect-error
              z.infer<Config[ActionName]['return']!>,
    >(
        actionName: ActionName,
        promptToSignIn: boolean = false,
        refreshAuth: boolean = true,
    ) => {
        const options = config[actionName];

        const [fetchState, setFetchState] = useState<
            FetchState<
                Config[ActionName]['errors'] extends readonly string[]
                    ? Config[ActionName]['errors'][number]
                    : undefined,
                Data
            >
        >({ status: 'idle', data: null, error: null });

        const call = (async (payload: unknown) => {
            setFetchState({
                status: 'loading',
                data: null,
                error: null,
            });
            const response = await invokeWithRefreshing(
                url,
                actionName as string,
                options,
                payload,
                refreshActionName as string,
                refreshAuth,
            );
            if (!isEither(response)) {
                setFetchState({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                });
                return handleNetworkError();
            }
            if (response.isRight()) {
                return setFetchState({
                    status: 'success',
                    data: response.value as Data,
                    error: null,
                });
            }
            if (response.value === 'Unauthorized') {
                setFetchState({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                });
                return handleUnauthorizedError(promptToSignIn);
            }
            if (response.value === 'RequiredUnauthorized') {
                setFetchState({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                });
                return handleRequiredUnauthorizedError();
            }
            if (response.value === 'NetworkError') {
                setFetchState({
                    status: 'error',
                    data: null,
                    error: 'NotLogicError',
                });
                return handleNetworkError();
            }

            return setFetchState({
                status: 'error',
                data: null,
                // @ts-expect-error
                error: response.value,
            });
        }) as undefined extends Config[ActionName]['payload']
            ? () => Promise<void>
            : (
                  // @ts-expect-error
                  payload: z.infer<Config[ActionName]['payload']!>,
              ) => Promise<void>;

        return {
            ...fetchState,
            call,
        };

        // type Data = Awaited<ReturnType<typeof apiAction>>['value']
        // type Error = Parameters<Parameters<Awaited<ReturnType<typeof apiAction>>['mapLeft']>['0']>['0']
        // type Data = Parameters<Parameters<Awaited<ReturnType<typeof apiAction>>['mapRight']>['0']>['0']
        // type Payload =  Parameters<typeof apiAction>['0']
    };
