import { usePopUrlStateListener } from '../../modules/url';
import { Layout } from '../../components/layout';
import { ColorModeProvider } from '../../features/colorMode/public/components';
import { GlobalStyles } from './styles';
import { AuthProvider } from '../../features/auth/public/components';

export const Initial = () => {
    usePopUrlStateListener();

    return (
        <AuthProvider>
            <ColorModeProvider>
                <GlobalStyles />
                <Layout />
            </ColorModeProvider>
        </AuthProvider>
    );
};
