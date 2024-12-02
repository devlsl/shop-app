import { useEffect } from 'react';
import { useUrlState } from './state';
import { getCurrentUrlState } from './utils';
import { isDeepEqual } from '../../shared/helpers/isDeepEqual';

export const usePopUrlStateListener = () => {
    useEffect(() => {
        const handle = () => {
            const prevState = useUrlState.getState().params;
            const nextState = getCurrentUrlState();
            if (!isDeepEqual(prevState, nextState))
                useUrlState.setState(() => ({ params: nextState }));
        };
        window.addEventListener('popstate', handle);
        return () => window.removeEventListener('popstate', handle);
    }, []);
};
