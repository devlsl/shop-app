import { apiSchema } from '@shop/shared';
import { ApiClientOptions } from 'ts-api-generator';
import { setUser } from '../auth';
import { pushNotification } from '../notifications';

export const apiClientOptions: ApiClientOptions<typeof apiSchema> = {
    apiOrigin: __APP_ENV__.SERVER_HOSTNAME,
    schema: apiSchema,
    refreshActionName: 'refreshAuth',
    onError: (type) => {
        if (type === 'network') return pushNotification('error', 'Ошибка сети');
        if (type === 'requiredUnauthorized')
            return pushNotification('error', 'Выйдите из уч. записи');
        if (type === 'unauthorized') return setUser(null);
    },
};
