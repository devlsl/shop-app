import { createRoot } from 'react-dom/client';
import { UrlProvider } from '../features/url';
import { AuthProvider } from '../features/auth';
import { ColorModeProvider } from '../features/colorMode';
import { Layout } from '../components/layout';
import { GlobalStyles } from './styles';

createRoot(document.getElementById('root')!).render(
    <UrlProvider>
        <AuthProvider>
            <ColorModeProvider>
                <GlobalStyles />
                <Layout />
            </ColorModeProvider>
        </AuthProvider>
    </UrlProvider>,
);
