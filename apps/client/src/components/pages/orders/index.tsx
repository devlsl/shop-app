import React, { forwardRef, useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { AuthNeedPage } from '../shared/authNeedPage';
import { NotFoundPage } from '../shared/NotFoundPage';
import { PageLoader } from '../../pageLoader';
import styled, { css, useTheme } from 'styled-components';
import { staticStyles } from '../../../shared/consts/styles/static';
import { transition } from '../../../shared/utils/styles/transition';
import { hover } from '../../../shared/utils/styles/hover';
import { Checkbox } from '../../checkbox';
import { Link } from '../../link';
import { typography } from '../../../shared/utils/styles/typography';
import {
    CrossIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBag,
    XIcon,
} from 'lucide-react';
import { ButtonText } from '../../buttonText';
import { pushNotification, showSignInView } from '../../../hooks/useAppState';
import { useIsAuthorized } from '../../../modules/user';
import { TextButton } from '../../buttons/textButton';
import { ApiReturnSchemas } from '../../../shared/consts/schemas/api';
import { useSearchParam } from '../../../modules/url';

export const OrdersPage = () => {
    return (
        <AuthNeedPage>
            <OrdersPageView />
        </AuthNeedPage>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 8px;
`;

export const orderStatusLabelMap: Record<
    ApiReturnSchemas['getOrder']['status'],
    string
> = {
    awaitedPayment: 'Ожидает оплаты',
    delivered: 'Доставлен',
    paid: 'Оплачен',
    received: 'Получен',
    rejected: 'Отклонён',
    sent: 'Отправлен',
};

const OrdersPageView = ({}) => {
    const { call, status } = useApi('getOrders');

    // const searchQuery = useSearchParam('search');

    const [orders, setOrders] = useState<ApiReturnSchemas['getOrders']>([]);

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
                        <OrderNumberTypo to={['/order', { orderId: order.id }]}>
                            Заказ #{order.orderNumber}
                        </OrderNumberTypo>
                        <ProductPrice>
                            Товаров: {order.productsCount}
                        </ProductPrice>
                        <ProductPrice>
                            {orderStatusLabelMap[order.status]}
                        </ProductPrice>
                        <ProductPrice>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </ProductPrice>
                        <ProductPrice>{order.amount} руб.</ProductPrice>
                        {order.status === 'awaitedPayment' && (
                            <MakeOrderButtonStyled>
                                <MakeOrderButtonText>
                                    Оплатить
                                </MakeOrderButtonText>
                            </MakeOrderButtonStyled>
                        )}
                    </ProductTypographyWrapper>

                    <OrderImagesWrapper>
                        {order.miniatures.map((miniature) => (
                            <Image
                                $url={miniature.url}
                                to={[
                                    '/product',
                                    {
                                        productId: miniature.productId,
                                        categoryId: miniature.categoryId,
                                    },
                                ]}
                            />
                        ))}
                    </OrderImagesWrapper>
                    {/* <ActionsWrapper>
                            <DeleteFromCartButton
                                onDeleted={() =>
                                    setCartItems((prev) =>
                                        prev
                                            .map((i) =>
                                                i.productId ===
                                                cartItem.productId
                                                    ? {
                                                          ...i,
                                                          count: i.count - 1,
                                                      }
                                                    : i,
                                            )
                                            .filter((i) => i.count !== 0),
                                    )
                                }
                                productId={cartItem.productId}
                            />
                            <CountTypo>{cartItem.count}</CountTypo>
                            <AddToCartButton
                                onAdded={() =>
                                    setCartItems((prev) =>
                                        prev.map((i) =>
                                            i.productId === cartItem.productId
                                                ? {
                                                      ...i,
                                                      count: i.count + 1,
                                                  }
                                                : i,
                                        ),
                                    )
                                }
                                productId={cartItem.productId}
                            />
                        </ActionsWrapper> */}

                    {/* <DeleteAllFromCartButton
                            onDeleted={() =>
                                setOrders((prev) =>
                                    prev.filter(
                                        (o) => o.orderId !== order.orderId,
                                    ),
                                )
                            }
                            productId={order.productId}
                        /> */}
                </Order>
            ))}
        </Orders>
    );
};

const OrderImagesWrapper = styled.div`
    /* border: 1px solid red; */
    display: flex;
    gap: 8px;
`;

const MakeOrderButtonStyled = styled(TextButton)`
    height: 40px;
    width: fit-content;
`;

const MakeOrderButtonText = styled(ButtonText)`
    ${typography({
        fontSize: '1.4rem',
        lineHeight: '1.5rem',
        fontWeight: '600',
    })}
`;

const ProductTypographyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
`;

const OrderNumberTypo = styled(Link)`
    ${transition('color')}
    ${typography({ fontSize: '1rem', lineHeight: '1.5rem' })}

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

const Image = styled(Link)<{ $url: string }>`
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
        transform: translateY(1px);
    }
`;

const Orders = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    padding-right: 8px;
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
