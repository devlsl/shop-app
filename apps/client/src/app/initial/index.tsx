import { usePopUrlStateListener } from '../../modules/url';
import { useAuthorizeChecking } from '../../hooks/useAuthorizeChecking';
import { Layout } from '../../components/layout';
import { ColorModeProvider } from '../../features/colorMode/public/components';
import { GlobalStyles } from './globalStyles';

export const Initial = () => {
    useAuthorizeChecking();
    usePopUrlStateListener();

    return (
        <ColorModeProvider>
            <GlobalStyles />
            <Layout />
        </ColorModeProvider>
    );
};
