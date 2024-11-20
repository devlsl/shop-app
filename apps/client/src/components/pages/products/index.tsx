import { useIsAuthorized } from '../../../modules/user';
import { AuthorizedProductsPage } from './authorized';
import { NotAuthorizedProductsPage } from './notAuthorized';

export const ProductsPage = () => {
    const isAuthorized = useIsAuthorized();

    return isAuthorized ? (
        <AuthorizedProductsPage />
    ) : (
        <NotAuthorizedProductsPage />
    );
};
