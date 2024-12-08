import styled, { css } from 'styled-components';
import { memo } from 'react';
import { z } from 'zod';
import { apiSchema } from '@shop/shared';
import { HeartIcon, PackagePlusIcon } from 'lucide-react';
import { useTheme } from 'styled-components';
import { Link } from '../../../../navigation';
import { showSignInPopup, useIsAuthorized } from '../../../../auth';
import { useApi } from '../../../../api';
import { transition } from '../../../../../shared/styles/transition';
import { hover } from '../../../../../shared/styles/hover';
import { typography } from '../../../../../shared/styles/typography';
import { CardsGrid } from '../../../../../shared/ui/CardsGrid';
import { pushNotification } from '../../../../notifications';
import { PageLoader } from '../../../../../shared/ui/PageLoader';
import { showProductPreview } from '../../..';
import { TextButton } from '../../../../../shared/ui/TextButton';
import { IconButton } from '../../../../../shared/ui/IconButton';
import { Tooltip } from '../../../../../shared/ui/Tooltip';

const CardWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
    overflow: hidden;
    padding: 0 0 1px 0;

    flex-direction: column;
    justify-content: space-between;
`;

export const LazyLoadingTrigger = styled.div`
    border: 1px solid transparent;
`;

const ProductImage = styled(Link)<{ $url: string }>`
    border-radius: 8px;

    ${transition('background-color', 'transform')}

    cursor: pointer;
    aspect-ratio: 4/5;
    background-image: url(${({ $url }) => $url});
    background-color: ${({ theme }) => theme.button.secondary.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;

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

const ProductName = styled.span`
    cursor: auto;
    ${typography({ fontSize: '12px', lineHeight: '18px' })}

    color: #8f8f8f;

    max-width: 100%;
    text-align: start;
    /* flex-grow: 1; */
    /* height: 100%; */

    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const ProductPrice = styled.span`
    cursor: auto;
    ${typography({ fontSize: '12px', lineHeight: '18px', fontWeight: 600 })}

    color: #9d9d9d;

    max-width: 100%;
    text-align: start;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const BuyButton = styled(TextButton)`
    /* background-color: #93524a */
    /* flex-shrink: 1; */
    flex-grow: 1;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const Q = styled.div`
    ${typography({
        fontSize: '12px',
        lineHeight: '18px',
    })}
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ProductTypographyWrapper = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100;
    flex-grow: 1;
    gap: 4px;
`;

const ProductActionsWrapper = styled.div`
    display: flex;
    height: 30px;
    gap: 8px;
`;

// const ProductActionIconButton = styled(IconButton)`
//     hei
// `

const AddToCartButton = ({
    isAuthorized,
    productId,
}: {
    isAuthorized: boolean;
    productId: string;
}) => {
    const { call, status } = useApi('addProductToCart');

    const handleClick = async () => {
        if (!isAuthorized) return showSignInPopup();
        if (status === 'loading') return;
        const response = await call({ productId, count: 1 });
        if (response.value === 'OutOfStock')
            return pushNotification('error', 'Товар закончился 😢');
        if (response.isRight())
            return pushNotification('success', 'Успешно добавлен в корзину');
    };

    const theme = useTheme();

    return (
        <Tooltip content='Добавить в корзину' side='bottom'>
            <IconButton onClick={handleClick}>
                <PackagePlusIcon />
                {status === 'loading' && (
                    <PageLoader
                        absolute
                        startColor={theme.dialog.foreground.background}
                        size='6px'
                        gap='3px'
                    />
                )}
            </IconButton>
        </Tooltip>
    );
};

const AddToFavoritesButton = ({
    isAuthorized,
    productId,
    isLiked,
    setFavoriteItemToState,
}: {
    isAuthorized: boolean;
    productId: string;
    isLiked: boolean;
    setFavoriteItemToState: (value: boolean) => void;
}) => {
    const { call: deleteFromFavorites, status: deletingStatus } = useApi(
        'deleteProductFromFavorites',
    );
    const { call: addToFavorites, status: addingStatus } = useApi(
        'addProductToFavorites',
    );

    const isLoading =
        deletingStatus === 'loading' || addingStatus === 'loading';

    const handleClick = async () => {
        if (!isAuthorized) return showSignInPopup();
        if (isLoading) return;
        const method = isLiked ? deleteFromFavorites : addToFavorites;

        const response = await method({ productId });

        if (response.isRight()) {
            pushNotification(
                'success',
                isLiked
                    ? 'Товар удалён из избранного'
                    : 'Товар добавлен в избранное',
            );
            setFavoriteItemToState(!isLiked);
        } else {
            pushNotification('info', 'Что-то пошло не так');
        }
    };

    const theme = useTheme();

    return (
        <Tooltip
            content={isLiked ? 'Удалить из избранного' : 'Добавить в избранные'}
            side='bottom'
        >
            <IconButton onClick={handleClick}>
                <HeartIcon color={isLiked ? 'red' : undefined} />
                {isLoading && (
                    <PageLoader
                        absolute
                        startColor={theme.dialog.foreground.background}
                        size='6px'
                        gap='3px'
                    />
                )}
            </IconButton>
        </Tooltip>
    );
};

const ProductCardView = ({
    id,
    categoryId,
    name,
    price,
    isLiked,
    previewUrl,
    isAuthorized,
    setFavoriteItemToState,
}: {
    id: string;
    name: string;
    price: string;
    previewUrl: string;
    isAuthorized: boolean;
    isLiked: boolean;
    categoryId: string | null;
    setFavoriteItemToState: (value: boolean) => void;
}) => {
    return (
        <CardWrapper>
            <ProductImage
                $url={previewUrl}
                to={['product', { productId: id, categoryId }]}
            />
            <ProductTypographyWrapper>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductTypographyWrapper>
            <ProductActionsWrapper>
                <BuyButton onClick={() => showProductPreview(id)}>
                    <Q>Просмотр</Q>
                </BuyButton>

                <AddToFavoritesButton
                    isAuthorized={isAuthorized}
                    isLiked={isLiked}
                    productId={id}
                    setFavoriteItemToState={setFavoriteItemToState}
                />
                <AddToCartButton isAuthorized={isAuthorized} productId={id} />
            </ProductActionsWrapper>
        </CardWrapper>
    );
};

const Gr = styled(CardsGrid)`
    row-gap: 20px;
`;

export const ProductsView = memo(
    ({
        items,
        setFavoriteItemToState,
    }: {
        items: z.infer<
            (typeof apiSchema)['getProductsPageItems']['return']
        >['items'];
        setFavoriteItemToState: (id: string, value: boolean) => void;
    }) => {
        const isAuthorized = useIsAuthorized();
        return (
            <Gr>
                {items.map((item) => (
                    <ProductCardView
                        setFavoriteItemToState={(value) =>
                            setFavoriteItemToState(item.id, value)
                        }
                        id={item.id}
                        key={item.id}
                        price={item.price.concat(' руб.')}
                        name={item.name}
                        categoryId={item.categoryId}
                        isLiked={item.isLiked ?? false}
                        previewUrl={item.miniatures[0].url}
                        isAuthorized={isAuthorized}
                    />
                ))}
            </Gr>
        );
    },
);
