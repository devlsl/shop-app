import { ProductPreview } from './productPreview';
import { NotificationsView } from './notifications/list';
import { ProductFiltersDialog } from './productFiltersDialog';
import { SignInPopup } from '../../features/auth/public/components';

export const Popups = () => {
    return (
        <>
            <ProductFiltersDialog />
            <ProductPreview />
            <SignInPopup />
            <NotificationsView />
        </>
    );
};
