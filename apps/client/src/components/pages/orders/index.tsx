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

const orderStatusLabelMap: Record<
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
                        <ProductName to={['/order', { orderId: order.id }]}>
                            Заказ #{order.orderNumber}
                        </ProductName>
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
                        {order.miniatures.slice(0, 3).map((miniature) => (
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

const DotsWrapper = styled.div`
    ${transition('border-color')}

    border-bottom: 2px dotted ${({ theme }) => theme.new[5]};

    height: 16px;
    flex: 1;
`;

const SummaryText = styled.span`
    cursor: auto;
    ${typography({
        fontSize: '1.4rem',
        lineHeight: '1.5rem',
        fontWeight: '600',
    })}

    color: #8f8f8f;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const SummaryWrapper = styled.div`
    padding: 16px 0;
    /* border: 1px solid red; */
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
`;

const SummaryTextWrapper = styled.div`
    flex: 1;
    display: flex;
    gap: 6px;
    justify-content: space-between;
    align-items: center;
`;

const CountTypo = styled.span`
    ${typography({ fontSize: '1rem', lineHeight: '1.5px', fontWeight: 600 })}
    color: #9d9d9d;
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const MakeOrderButtonStyled = styled(TextButton)`
    height: 30px;
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

const ProductName = styled(Link)`
    /* cursor: auto; */
    ${transition('color')}
    ${typography({ fontSize: '1rem', lineHeight: '1.5rem' })}

    ${hover(css`
        color: ${({ theme }) => theme.button.secondary.hover.text};
    `)}

    color: #8f8f8f;

    max-width: 100%;
    text-align: start;
    /* flex-grow: 1; */
    /* height: 100%; */

    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const ProductPrice = styled.span`
    cursor: auto;
    ${typography({
        fontSize: '0.9rem',
        lineHeight: '1.35rem',
        fontWeight: 600,
    })}

    color: #9d9d9d;

    max-width: 100%;
    text-align: start;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Image = styled(Link)<{ $url: string }>`
    border-radius: 8px;
    flex-shrink: 0;
    /* height: 100%; */

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
