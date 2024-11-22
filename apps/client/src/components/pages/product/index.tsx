import { useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { PageLoader } from '../../pageLoader';
import { NotFoundPage } from '../shared/NotFoundPage';
import { AuthDependentView } from '../shared/authDependentView';
import { useSearchParam } from '../../../modules/url';

const ProductPageView = ({
    isAuthorized = false,
}: {
    isAuthorized?: boolean;
}) => {
    const productId = useSearchParam('productId') ?? '';
    const { data, call } = useApi(
        isAuthorized ? 'getProductPageItem' : 'getProductPageItemForGuest',
    );
    useEffect(() => {
        call({ productId });
    }, [productId]);
    if (data === null) return <PageLoader />;
    if (data === undefined)
        return <NotFoundPage>Такого товара нет 😢</NotFoundPage>;
    return <div>{data.id}</div>;
};

export const ProductPage = () => (
    <AuthDependentView
        authorized={<ProductPageView isAuthorized />}
        checking={<PageLoader />}
        unauthorized={<ProductPageView />}
    />
);
