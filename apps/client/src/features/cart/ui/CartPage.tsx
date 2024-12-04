import { useEffect, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { AuthNeedPage } from '../../auth';
import { ApiReturnData, useApi } from '../../api';
import { PageLoader } from '../../../shared/ui/PageLoader';
import { NotFoundPage } from '../../../pages/shared/NotFoundPage';
import { Checkbox } from '../../../shared/ui/CheckBox';
import { pushNotification } from '../../notifications';
import { transition } from '../../../shared/styles/transition';
import { typography } from '../../../shared/styles/typography';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { ButtonText } from '../../../shared/ui/ButtonText';
import { Link } from '../../navigation';
import { hover } from '../../../shared/styles/hover';
import { staticStyles } from '../../../shared/consts/staticStyles';
import { TextButton } from '../../../shared/ui/TextButton';

const CartPage = () => {
    return (
        <AuthNeedPage>
            <CartPageView />
        </AuthNeedPage>
    );
};

export default CartPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 8px;
`;

const CartPageView = () => {
    const { call, status } = useApi('getCart');

    const [selectedItems, setSelectedItems] = useState<
        Record<string, boolean | undefined>
    >({});

    const [cartItems, setCartItems] = useState<ApiReturnData['getCart']>([]);

    const fetchData = async () => {
        if (status === 'loading') return;
        const response = await call();
        if (response.isRight()) setCartItems(response.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (status === 'loading' || status === 'idle') return <PageLoader />;

    if (cartItems === null || cartItems.length === 0)
        return <NotFoundPage>Корзина пуста 😢</NotFoundPage>;

    return (
        <Wrapper>
            <CartItems>
                {cartItems
                    .filter((i) => i.count !== 0)
                    .map((cartItem) => (
                        <CartItem
                            $isSelected={
                                selectedItems[cartItem.productId] ?? false
                            }
                        >
                            <Checkbox
                                isChecked={
                                    selectedItems[cartItem.productId] ?? false
                                }
                                toggleIsChecked={() =>
                                    setSelectedItems((prev) => ({
                                        ...prev,
                                        [cartItem.productId]: !(
                                            prev[cartItem.productId] ?? false
                                        ),
                                    }))
                                }
                            />
                            <Image
                                to={[
                                    'product',
                                    {
                                        productId: cartItem.productId,
                                        categoryId: cartItem.categoryId,
                                    },
                                ]}
                                $url={cartItem.miniatures[0].url}
                            />
                            <ProductTypographyWrapper>
                                <ProductName>{cartItem.name}</ProductName>
                                <ProductPrice>
                                    {cartItem.price} руб.
                                </ProductPrice>
                            </ProductTypographyWrapper>
                            <ActionsWrapper>
                                <DeleteFromCartButton
                                    onDeleted={() =>
                                        setCartItems((prev) =>
                                            prev
                                                .map((i) =>
                                                    i.productId ===
                                                    cartItem.productId
                                                        ? {
                                                              ...i,
                                                              count:
                                                                  i.count - 1,
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
                                                i.productId ===
                                                cartItem.productId
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
                            </ActionsWrapper>

                            <DeleteAllFromCartButton
                                onDeleted={() =>
                                    setCartItems((prev) =>
                                        prev.filter(
                                            (i) =>
                                                i.productId !==
                                                cartItem.productId,
                                        ),
                                    )
                                }
                                productId={cartItem.productId}
                            />
                        </CartItem>
                    ))}
            </CartItems>

            <SummaryWrapper>
                <SummaryTextWrapper>
                    <SummaryText>Итого</SummaryText>
                    <DotsWrapper />
                    <SummaryText>
                        {cartItems.reduce(
                            (acc, cur) =>
                                selectedItems[cur.productId]
                                    ? acc + cur.count * cur.price
                                    : acc,
                            0,
                        )}{' '}
                        руб.
                    </SummaryText>
                </SummaryTextWrapper>
                <MakeOrderButton
                    items={cartItems
                        .filter((i) => selectedItems[i.productId])
                        .map((i) => ({
                            count: i.count,
                            productId: i.productId,
                        }))}
                    onMade={() => {
                        setCartItems((prev) =>
                            prev.filter(
                                (i) => selectedItems[i.productId] !== true,
                            ),
                        );
                        pushNotification(
                            'success',
                            'Заказ оформлен и ожидает оплаты',
                        );
                    }}
                />
            </SummaryWrapper>
        </Wrapper>
    );
};

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

const ProductActionButton = styled(TextButton)`
    padding: 0;
    height: 26px;
    width: 26px;
    flex-shrink: 0;

    svg {
        stroke-width: 2px;
        width: 18px;
        height: 18px;
    }
`;

const AddToCartButton = ({
    productId,
    onAdded,
}: {
    productId: string;
    onAdded: () => void;
}) => {
    const { call, status } = useApi('addProductToCart');

    const handleClick = async () => {
        if (status === 'loading') return;
        const response = await call({ productId, count: 1 });
        if (response.value === 'OutOfStock')
            return pushNotification('error', 'Товар закончился 😢');
        if (response.isRight()) {
            onAdded();
            return pushNotification('success', 'Успешно добавлен в корзину');
        }
    };

    const theme = useTheme();

    return (
        <ProductActionButton onClick={handleClick}>
            <PlusIcon />
            {status === 'loading' && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='4px'
                    gap='3px'
                />
            )}
        </ProductActionButton>
    );
};

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

const MakeOrderButton = ({
    onMade,
    items,
}: {
    onMade: () => void;
    items: { productId: string; count: number }[];
}) => {
    const { call, status } = useApi('makeOrder');

    const handleClick = async () => {
        if (status === 'loading') return;
        const itemsCount = items.reduce((acc, i) => acc + i.count, 0);
        if (itemsCount === 0)
            return pushNotification(
                'info',
                'Выберите товары для оформления заказа',
            );
        const response = await call(items);
        if (response.isLeft())
            return pushNotification('info', 'Что-то пошло не так');
        if (response.isRight()) return onMade();
    };

    const theme = useTheme();

    return (
        <MakeOrderButtonStyled onClick={handleClick}>
            <MakeOrderButtonText>Оформить заказ</MakeOrderButtonText>
            {status === 'loading' && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='4px'
                    gap='3px'
                />
            )}
        </MakeOrderButtonStyled>
    );
};

const DeleteAllFromCartButton = ({
    productId,
    onDeleted,
}: {
    productId: string;
    onDeleted: () => void;
}) => {
    const { call, status } = useApi('deleteProductFromCart');

    const handleClick = async () => {
        if (status === 'loading') return;
        const response = await call({ productId, count: 'all' });
        if (response.isLeft())
            return pushNotification('info', 'Что-то пошло не так');
        if (response.isRight()) {
            onDeleted();
            return pushNotification(
                'success',
                'Товары были удалены из корзины',
            );
        }
    };

    const theme = useTheme();

    return (
        <ProductActionButton onClick={handleClick}>
            <XIcon />
            {status === 'loading' && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='4px'
                    gap='3px'
                />
            )}
        </ProductActionButton>
    );
};

const DeleteFromCartButton = ({
    productId,
    onDeleted,
}: {
    productId: string;
    onDeleted: () => void;
}) => {
    const { call, status } = useApi('deleteProductFromCart');

    const handleClick = async () => {
        if (status === 'loading') return;
        const response = await call({ productId, count: 1 });
        if (response.isLeft())
            return pushNotification('info', 'Что-то пошло не так');
        if (response.isRight()) {
            onDeleted();
            return pushNotification('success', 'Товар был удалён из корзины');
        }
    };

    const theme = useTheme();

    return (
        <ProductActionButton onClick={handleClick}>
            <MinusIcon />
            {status === 'loading' && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='4px'
                    gap='3px'
                />
            )}
        </ProductActionButton>
    );
};

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

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    padding-right: 8px;
`;

const CartItem = styled.div<{ $isSelected?: boolean }>`
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
