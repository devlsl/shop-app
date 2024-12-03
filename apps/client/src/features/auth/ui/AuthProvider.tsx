import { useAuthorizeChecking } from '../hooks';
import { SignInPopup } from './SignInPopup';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    useAuthorizeChecking();
    return (
        <>
            {children}
            <SignInPopup />
        </>
    );
};
