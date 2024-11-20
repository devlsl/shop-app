import { NotAuthorizedProductPreview } from './notAuthorized';
import { AuthorizedProductPreview } from './authorized';
import { useIsAuthorized } from '../../../modules/user';

export const ProductPreview = () =>
    useIsAuthorized() ? (
        <AuthorizedProductPreview />
    ) : (
        <NotAuthorizedProductPreview />
    );
