import { useIsAuthorized } from '../../modules/user';

import { NotAuthorizedProductPreview } from './notAuthorized';
import { AuthorizedProductPreview } from './authorized';

export const ProductPreview = () =>
    useIsAuthorized() ? (
        <AuthorizedProductPreview />
    ) : (
        <NotAuthorizedProductPreview />
    );
