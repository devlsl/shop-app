import { useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { setUser } from './actions';

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
