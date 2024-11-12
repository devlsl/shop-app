import { apiSchema } from '@shop/shared';
import { createUseApi } from './createUseApi';
import { setUser } from '../modules/user';
import { pushNotification } from './useAppState';

export const { useApi, apiAction } = createUseApi(
    __APP_ENV__.SERVER_HOSTNAME,
    apiSchema,
    'refreshAuth',
    (type) => {
        if (type === 'network') return pushNotification('error', 'Ошибка сети');
        if (type === 'requiredUnauthorized')
            return pushNotification('error', 'Выйдите из уч. записи');
        if (type === 'unauthorized') return setUser(null);
    },
);
