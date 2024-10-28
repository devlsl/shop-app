import { useEffect } from 'react';
import { setUser } from '../modules/user';
import { useApi } from './useApi';

export const useAuthorizeChecking = () => {
    const { call, status, data } = useApi('checkAuth');
    useEffect(() => {
        call();
    }, []);

    useEffect(() => {
        if (status === 'error') setUser(null);
        if (status === 'success') setUser(data);
    }, [status]);
};
