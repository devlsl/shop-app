import { ProductPreview } from './productPreview';
import { SignInView } from './signInView';
import { NotificationsView } from './notifications/list';
import { ProductFiltersDialog } from './productFiltersDialog';

export const Popups = () => {
    return (
        <>
            <ProductFiltersDialog />
            <ProductPreview />
            <SignInView />
            <NotificationsView />
        </>
    );
};
