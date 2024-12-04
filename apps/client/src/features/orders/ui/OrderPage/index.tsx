import { useEffect, useState } from 'react';
import { AuthNeedPage } from '../../../auth';
import styled, { css } from 'styled-components';
import { typography } from '../../../../shared/styles/typography';
import { ApiReturnData, useApi } from '../../../api';
import { Link, useNavigationParam } from '../../../navigation';
import { NotFoundPage } from '../../../../pages/shared/NotFoundPage';
import { orderStatusLabelMap } from '../OrdersPage';
import { PageLoader } from '../../../../shared/ui/PageLoader';
import { pushNotification } from '../../../notifications';
import { ButtonText } from '../../../../shared/ui/ButtonText';
import { transition } from '../../../../shared/styles/transition';
import { hover } from '../../../../shared/styles/hover';
import { staticStyles } from '../../../../shared/consts/staticStyles';
import { TextButton } from '../../../../shared/ui/TextButton';

const OrderPage = () => {
    return (
        <AuthNeedPage>
            <OrderPageView />
        </AuthNeedPage>
    );
};

export default OrderPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 8px;
    /* gap: 8px; */
    /* padding-top: 12px; */
`;

const OrderStatusText = styled.span`
    ${typography({ fontSize: '0.9rem', lineHeight: '0.9rem' })}

    color: ${({ theme }) => theme.button.secondary.text};

    border: 1px solid ${({ theme }) => theme.button.secondary.text};
    padding: 5px;
    border-radius: 8px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const OrderPageView = ({}) => {
    const { call, status } = useApi('getOrder');

    const orderId = useNavigationParam('orderId') ?? '';

    const [order, setOrder] = useState<ApiReturnData['getOrder']>();

    const fetchData = async () => {
        if (status === 'loading') return;
        const response = await call({ orderId });
        if (response.isRight()) setOrder(response.value);
    };

    useEffect(() => {
        fetchData();
    }, [orderId]);

    if (status === 'loading' || status === 'idle') return <PageLoader />;

    if (order === undefined)
        return <NotFoundPage>Заказ не найден 😢</NotFoundPage>;

    return (
        <Wrapper>
            <OrderTitleWrapper>
                <OrderNumberTypo>Заказ #{order.orderNumber}</OrderNumberTypo>
                <OrderStatusText>
                    {orderStatusLabelMap[order.status]}
                </OrderStatusText>
            </OrderTitleWrapper>

            <CartItems>
                {order.items.map((cartItem) => (
                    <CartItem>
                        <Image
                            to={[
                                'product',
                                {
                                    productId: cartItem.productId,
                                    categoryId: cartItem.categoryId,
                                },
                            ]}
                            $url={cartItem.miniature}
                        />
                        <ProductTypographyWrapper>
                            <ProductName>{cartItem.name}</ProductName>
                            <ProductPrice>{cartItem.price} руб.</ProductPrice>
                        </ProductTypographyWrapper>
                        <ProductName>
                            x{cartItem.count} ={' '}
                            {cartItem.count * cartItem.price} руб.
                        </ProductName>
                    </CartItem>
                ))}
            </CartItems>

            <SummaryWrapper>
                <SummaryTextWrapper>
                    <SummaryText>Итого</SummaryText>
                    <DotsWrapper />
                    <SummaryText>
                        {order.items.reduce(
                            (acc, cur) => acc + cur.price * cur.count,
                            0,
                        )}{' '}
                        руб.
                    </SummaryText>
                </SummaryTextWrapper>

                {order.status === 'awaitedPayment' && (
                    <MakeOrderButtonStyled
                        onClick={() =>
                            pushNotification('info', 'Недостаточно средств')
                        }
                    >
                        <MakeOrderButtonText>Оплатить</MakeOrderButtonText>
                    </MakeOrderButtonStyled>
                )}
            </SummaryWrapper>
        </Wrapper>
    );
};

const OrderTitleWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 8px 0;
`;

const MakeOrderButtonStyled = styled(TextButton)`
    height: 48px;
`;

const MakeOrderButtonText = styled(ButtonText)`
    ${typography({
        fontSize: '1.4rem',
        lineHeight: '1.5rem',
        fontWeight: '600',
    })}
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

const OrderNumberTypo = styled.span`
    ${typography({ fontSize: '1.5rem', lineHeight: '1.5rem' })}

    color: ${({ theme }) => theme.button.secondary.hover.text};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ProductTypographyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
`;

const ProductName = styled.span`
    cursor: auto;
    ${typography({ fontSize: '1rem', lineHeight: '1.5rem' })}

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

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    padding-right: 8px;
    height: 100%;
`;

const CartItem = styled.div`
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
`;
