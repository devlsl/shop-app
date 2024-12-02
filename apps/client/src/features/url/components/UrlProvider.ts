import { usePopUrlStateListener } from '../hooks';

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
    usePopUrlStateListener();
    return children;
};
