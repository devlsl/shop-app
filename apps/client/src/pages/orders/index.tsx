import { useEffect, useState } from 'react';
import { AuthNeedPage } from '../../features/auth';
import { PageLoader } from '../../shared/ui/PageLoader';
import styled, { css } from 'styled-components';
import { staticStyles } from '../../shared/consts/staticStyles';
import { Link } from '../../features/url/ui/Link';
import { ApiReturnData, useApi } from '../../features/api';
import { useBreakpoint } from '../../features/breakpoints';
import { transition } from '../../shared/styles/transition';
import { hover } from '../../shared/styles/hover';
import { typography } from '../../shared/styles/typography';
import { NotFoundPage } from '../shared/NotFoundPage';

const OrdersPage = () => {
    return (
        <AuthNeedPage>
            <OrdersPageView />
        </AuthNeedPage>
    );
};

export default OrdersPage;

export const orderStatusLabelMap: Record<
    ApiReturnData['getOrder']['status'],
    string
> = {
    awaitedPayment: 'Ожидает оплату',
    delivered: 'Доставлен',
    paid: 'Оплачен',
    received: 'Получен',
    rejected: 'Отклонён',
    sent: 'Отправлен',
};

const OrdersPageView = ({}) => {
    const { call, status } = useApi('getOrders');

    // const searchQuery = useSearchParam('search');

    const [orders, setOrders] = useState<ApiReturnData['getOrders']>([]);

    const isHiddenOrderItemImages = useBreakpoint({ max: 350 });

    const fetchData = async () => {
        const response = await call();
        if (response.isRight()) setOrders(response.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (status === 'loading' || status === 'idle') return <PageLoader />;

    if (orders === null || orders.length === 0)
        return <NotFoundPage>Заказов ещё нет 😢</NotFoundPage>;

    return (
        <Orders>
            {orders.map((order) => (
                <Order>
                    <ProductTypographyWrapper>
                        <OrderTitleWrapper>
                            <OrderNumberTypo
                                to={['order', { orderId: order.id }]}
                            >
                                Заказ #{order.orderNumber}
                            </OrderNumberTypo>
                            <OrderStatusText>
                                {orderStatusLabelMap[order.status]}
                            </OrderStatusText>
                        </OrderTitleWrapper>
                        <ProductPriceDark>
                            Товаров: {order.productsCount}
                        </ProductPriceDark>
                        <ProductPriceDark>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </ProductPriceDark>
                        <ProductPrice>{order.amount} руб.</ProductPrice>
                    </ProductTypographyWrapper>
                    {!isHiddenOrderItemImages && (
                        <OrderImagesWrapper>
                            <Image
                                $url={order.miniatures[0].url ?? ''}
                                to={[
                                    'product',
                                    {
                                        productId:
                                            order.miniatures[0].productId,
                                        categoryId:
                                            order.miniatures[0].categoryId,
                                    },
                                ]}
                            />
                            {order.miniatures.length > 1 && (
                                <OtherOrderItems
                                    $url={order.miniatures[1].url ?? ''}
                                    to={['order', { orderId: order.id }]}
                                />
                            )}
                        </OrderImagesWrapper>
                    )}
                </Order>
            ))}
        </Orders>
    );
};

const OtherOrderItems = styled(Link)<{ $url: string }>`
    position: absolute;
    inset: 0;
    transform: translate(10px, -10px);
    z-index: 1;

    background-color: red;

    border-radius: 8px;
    flex-shrink: 0;

    ${transition('background-color', 'transform')}

    cursor: pointer;
    aspect-ratio: 4/5;
    background-image: url(${({ $url }) => $url});
    background-color: ${({ theme }) => theme.button.secondary.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 80px;

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
    }
`;

const Image = styled(Link)<{ $url: string }>`
    border-radius: 8px;
    flex-shrink: 0;
    z-index: 2;
    border: 1px solid ${({ theme }) => theme.body.background};

    ${transition('background-color', 'transform')}

    cursor: pointer;
    aspect-ratio: 4/5;
    background-image: url(${({ $url }) => $url});
    background-color: ${({ theme }) => theme.button.secondary.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 80px;

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
        transform: translateY(1px);
    }
`;

const OrderImagesWrapper = styled.div`
    display: flex;
    position: relative;
    padding-right: 10px;
`;

const ProductTypographyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
`;

const OrderNumberTypo = styled(Link)`
    ${transition('color')}
    ${typography({ fontSize: '1.2rem', lineHeight: '1.5rem' })}

    color: ${({ theme }) => theme.button.secondary.hover.text};
    ${hover(css`
        color: ${({ theme }) => theme.button.secondary.active.text};
    `)}

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ProductPrice = styled.span`
    ${transition('color')}
    ${typography({ fontSize: '1rem', lineHeight: '1.5rem' })}

    color: ${({ theme }) => theme.button.secondary.hover.text};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ProductPriceDark = styled.span`
    ${transition('color')}
    ${typography({ fontSize: '0.8rem', lineHeight: '1.2rem' })}

    color: ${({ theme }) => theme.button.secondary.text};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Orders = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    padding-right: 8px;
`;

const OrderTitleWrapper = styled.div`
    display: flex;
    gap: 12px;
    row-gap: 6px;
    flex-wrap: wrap;
    align-items: center;
`;

const OrderStatusText = styled.span`
    ${typography({ fontSize: '0.9rem', lineHeight: '0.9rem' })}

    color: ${({ theme }) => theme.button.secondary.text};

    display: block;

    width: fit-content;

    border: 1px solid ${({ theme }) => theme.button.secondary.text};
    padding: 5px;
    border-radius: 8px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Order = styled.div<{ $isSelected?: boolean }>`
    overflow: auto;
    ${transition('border-color')}
    flex-shrink: 0;
    border-radius: ${staticStyles.border.radius};
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 20px 20px;
    align-items: center;
    border: 2px solid ${({ theme }) => theme.button.outline.border};

    ${({ theme, $isSelected }) =>
        $isSelected &&
        css`
            border-color: ${theme.focusOutline};
        `}
`;
