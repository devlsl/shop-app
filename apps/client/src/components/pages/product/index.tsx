import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { PageLoader } from '../../pageLoader';
import { NotFoundPage } from '../shared/NotFoundPage';
import { AuthDependentView } from '../shared/authDependentView';
import { useUrlParam } from '../../../modules/url';
import styled, { css, useTheme } from 'styled-components';
import { breakpoint } from '../../../shared/utils/styles/breakpointMedia';
import { transition } from '../../../shared/utils/styles/transition';
import { typography } from '../../../shared/utils/styles/typography';
import { TextButton } from '../../buttons/textButton';
import { HeartIcon, ShoppingBag } from 'lucide-react';
import { pushNotification, showSignInView } from '../../../hooks/useAppState';
import { useIsAuthorized } from '../../../modules/user';
import { ButtonText } from '../../buttonText';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
`;

const FirstRowWrapper = styled.div`
    display: flex;
    gap: 20px;

    ${breakpoint(
        { max: 570 },
        css`
            flex-direction: column;
        `,
    )}
`;

const ProductImage = styled.div<{ $url: string }>`
    ${transition('background-color')}

    border-radius: 8px;

    aspect-ratio: 4/5;
    background-image: url(${({ $url }) => $url});
    background-color: ${({ theme }) => theme.button.secondary.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    width: 100%;
`;

const ProductInfoSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 16px;
    width: 100%;
`;

const ProductActionsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const ProductName = styled.span`
    cursor: auto;
    ${typography({
        fontSize: '1.4rem',
        lineHeight: '1.8rem',
        fontWeight: '600',
    })}

    ${breakpoint(
        { max: 570 },
        css`
            ${typography({
                fontSize: '1.6rem',
                lineHeight: '2.2rem',
                fontWeight: '600',
            })}
        `,
    )}

color: ${({ theme }) => theme.button.outline.text};
`;

const ProductPrice = styled.span`
    cursor: auto;
    ${typography({
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: '500',
    })}

    ${breakpoint(
        { max: 570 },
        css`
            ${typography({
                fontSize: '1.2rem',
                lineHeight: '1.6rem',
                fontWeight: '500',
            })}
        `,
    )}

color: ${({ theme }) => theme.new['4']};
`;

const ProductActionButton = styled(TextButton)`
    justify-content: start;
    height: 40px;
    svg {
        stroke-width: 3px;
    }
    /* flex: 1; */
`;

const AddToCartButton = ({ productId }: { productId: string }) => {
    const isAuthorized = useIsAuthorized();
    const { call, status } = useApi('addProductToCart');

    const handleClick = async () => {
        if (!isAuthorized) return showSignInView();
        if (status === 'loading') return;
        const response = await call({ productId, count: 1 });
        if (response.value === 'OutOfStock')
            return pushNotification('error', 'Товар закончился 😢');
        if (response.isRight())
            return pushNotification('success', 'Успешно добавлен в корзину');
    };

    const theme = useTheme();

    return (
        <ProductActionButton onClick={handleClick}>
            <ButtonText $size='l'>Добавить в корзину</ButtonText>
            <ShoppingBag />
            {status === 'loading' && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='12px'
                    gap='10px'
                />
            )}
        </ProductActionButton>
    );
};

const AddToFavoritesButtonIcon = styled(HeartIcon)<{ $isLiked: boolean }>`
    ${({ $isLiked }) =>
        $isLiked &&
        css`
            color: red;
        `}
`;

const AddToFavoritesButton = ({
    productId,
    isLiked,
    setFavoriteItemToState,
}: {
    productId: string;
    isLiked: boolean;
    setFavoriteItemToState: (value: boolean) => void;
}) => {
    const isAuthorized = useIsAuthorized();

    const { call: deleteFromFavorites, status: deletingStatus } = useApi(
        'deleteProductFromFavorites',
    );
    const { call: addToFavorites, status: addingStatus } = useApi(
        'addProductToFavorites',
    );

    const isLoading =
        deletingStatus === 'loading' || addingStatus === 'loading';

    const handleClick = async () => {
        if (!isAuthorized) return showSignInView();
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
        <ProductActionButton onClick={handleClick}>
            <ButtonText $size='l'>
                {isLiked ? 'Удалить из избранного' : 'Добавить в избранные'}
            </ButtonText>
            <AddToFavoritesButtonIcon $isLiked={isLiked} />
            {isLoading && (
                <PageLoader
                    absolute
                    startColor={theme.dialog.foreground.background}
                    size='12px'
                    gap='10px'
                />
            )}
        </ProductActionButton>
    );
};

const ProductFeaturesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const DotsWrapper = styled.div`
    ${transition('border-color')}

    border-bottom: 2px dotted ${({ theme }) => theme.new[5]};

    height: 9px;
    flex: 1;
`;

const Section = styled.div`
    flex: 1;
`;

const LeftSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    gap: 20px;
`;

const ProductFeatureTypography = styled.span`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProductPageView = ({
    isAuthorized = false,
}: {
    isAuthorized?: boolean;
}) => {
    const productId = useUrlParam('productId') ?? '';
    const { data, call } = useApi(
        isAuthorized ? 'getProduct' : 'getProductForGuest',
    );
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (data) setIsLiked(data.isLiked);
    }, [data]);

    useEffect(() => {
        call({ productId });
    }, [productId]);
    if (data === null) return <PageLoader />;
    if (data === undefined)
        return <NotFoundPage>Такого товара нет 😢</NotFoundPage>;

    return (
        <Wrapper>
            <FirstRowWrapper>
                <LeftSection>
                    <ProductImage $url={data.media[0].url ?? ''} />
                </LeftSection>
                <Section>
                    <ProductInfoSectionWrapper>
                        <ProductName>{data.name}</ProductName>
                        <ProductPrice>{data.price} руб.</ProductPrice>
                        <ProductActionsWrapper>
                            <AddToFavoritesButton
                                isLiked={isLiked}
                                productId={data.id}
                                setFavoriteItemToState={setIsLiked}
                            />
                            <AddToCartButton productId={productId} />
                        </ProductActionsWrapper>
                    </ProductInfoSectionWrapper>
                </Section>
            </FirstRowWrapper>
            <ProductFeaturesWrapper>
                {Object.entries(data.features).map(([key, value]) => (
                    <ProductFeatureItemWrapper>
                        <ProductFeatureTypography>
                            {key}
                        </ProductFeatureTypography>
                        <DotsWrapper />
                        <ProductFeatureTypography>
                            {value}
                        </ProductFeatureTypography>
                    </ProductFeatureItemWrapper>
                ))}
            </ProductFeaturesWrapper>
        </Wrapper>
    );
};

const ProductPage = () => (
    <AuthDependentView
        authorized={<ProductPageView isAuthorized />}
        checking={<PageLoader />}
        unauthorized={<ProductPageView />}
    />
);

export default ProductPage;

const ProductFeatureItemWrapper = styled.div`
    ${transition('color')}
    display: flex;
    justify-content: space-between;
    gap: 2px;
    align-items: center;
    width: 100%;

    ${typography({
        fontSize: '.9rem',
        lineHeight: '1.3rem',
        fontWeight: '500',
    })}
    color:  ${({ theme }) => theme.new[4]}
`;
