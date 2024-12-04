import { useEffect } from 'react';
import { getCurrentNavigationState } from './utils';
import { useNavigationState } from './state';
import { isDeepEqual } from '../../shared/helpers/isDeepEqual';

export const usePopNavigationStateListener = () => {
    useEffect(() => {
        const handle = () => {
            const prevState = useNavigationState.getState().params;
            const nextState = getCurrentNavigationState();
            if (!isDeepEqual(prevState, nextState))
                useNavigationState.setState(() => ({ params: nextState }));
        };
        window.addEventListener('popstate', handle);
        return () => window.removeEventListener('popstate', handle);
    }, []);
};
