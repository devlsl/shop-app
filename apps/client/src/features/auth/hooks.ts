import { useEffect } from 'react';
import { setUser } from './actions';
import { useApi } from '../api';

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
