import { apiSchema } from '@shop/shared';
import { createUseApi } from './createUseApi';
import { setUser } from '../modules/user';
import { pushNotification } from './useAppState';

export const { useApi, apiAction } = createUseApi(
    'http://localhost:3000',
    apiSchema,
    'refreshAuth',
    (type) => {
        if (type === 'network')
            return pushNotification('error', 'network error');
        if (type === 'requiredUnauthorized')
            return pushNotification('error', 'need to sign out');
        if (type === 'unauthorized') return setUser(null);
    },
);
