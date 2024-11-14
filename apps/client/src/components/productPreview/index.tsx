import { useIsAuthorized } from '../../modules/user';

import { NotAuthorizedProductPreview } from './notAuthorized';
import { AuthorizedProductPreview } from './authorized';

export const ProductPreview = () => {
    const isAuthorized = useIsAuthorized();
    console.log(isAuthorized);
    return isAuthorized ? (
        <AuthorizedProductPreview />
    ) : (
        <NotAuthorizedProductPreview />
    );
};
