import { AuthProvider } from '../../features/auth';
import { ColorModeProvider } from '../../features/colorMode';
import { NavigationProvider } from '../../features/navigation';
import { NotificationsProvider } from '../../features/notifications';
import { ProductsProvider } from '../../features/products';
import { GlobalStyles } from '../GlobalStyles';
import { Layout } from './layout';

export const App = () => (
    <ColorModeProvider>
        <GlobalStyles />
        <NavigationProvider>
            <AuthProvider>
                <NotificationsProvider>
                    <ProductsProvider>
                        <Layout />
                    </ProductsProvider>
                </NotificationsProvider>
            </AuthProvider>
        </NavigationProvider>
    </ColorModeProvider>
);
