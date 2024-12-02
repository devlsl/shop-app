import { useAuthorizeChecking } from '../hooks';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    useAuthorizeChecking();
    return children;
};
