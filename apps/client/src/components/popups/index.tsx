import { ProductPreview } from './productPreview';
import { OutOfStockDialog } from './outOfStockDialog';
import { SignInView } from './signInView';
import { NotificationsView } from './notifications/list';
import { ProductFiltersDialog } from './productFiltersDialog';

export const Popups = () => {
    return (
        <>
            <OutOfStockDialog />
            <ProductFiltersDialog />
            <ProductPreview />
            <SignInView />
            <NotificationsView />
        </>
    );
};
