import { createRoot } from 'react-dom/client';
import { UrlProvider } from '../features/url';
import { AuthProvider } from '../features/auth';
import { ColorModeProvider } from '../features/colorMode';
import { Layout } from './Layout';
import { GlobalStyles } from './GlobalStyles';
import { NotificationsProvider } from '../features/notifications';
import { ProductsProvider } from '../features/products';

createRoot(document.getElementById('root')!).render(
    <ColorModeProvider>
        <GlobalStyles />
        <UrlProvider>
            <AuthProvider>
                <NotificationsProvider>
                    <ProductsProvider>
                        <Layout />
                    </ProductsProvider>
                </NotificationsProvider>
            </AuthProvider>
        </UrlProvider>
    </ColorModeProvider>,
);
