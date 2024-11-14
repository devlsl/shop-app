import styled, { css } from 'styled-components';
import { navigate, useSearchParam } from '../../modules/url';
import { useApi } from '../../hooks/useApi';
import { memo, useEffect, useState } from 'react';
import { PageLoader } from '../pageLoader';
import { Page } from '../../shared/types/page';
import { typography } from '../../shared/utils/styles/typography';
import { CardsGrid } from './shared/cardsGrid';
import { Card } from './shared/card';
import { TextButton } from '../buttons/textButton';
import { useBreakpoint } from '../../hooks/useBreakpoints';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { breakpoints } from '../../shared/consts/breakpoints';
import { breakpointToMedia } from '../../shared/utils/helpers/breakpointToMedia';
import { matchMediaBreakpoint } from '../../shared/utils/helpers/isBreakpointMathers';
import { Loader } from '../loader';
import { transition } from '../../shared/utils/styles/transition';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';
import { apiSchema } from '@shop/shared';
import { z } from 'zod';
import { IconButton } from '../buttons/iconButton';
import {
    AxeIcon,
    BotIcon,
    CarTaxiFrontIcon,
    HeartIcon,
    PackagePlusIcon,
} from 'lucide-react';
import { hover } from '../../shared/utils/styles/hover';
import { FooterButton } from '../buttons/footerButton';
import { staticStyles } from '../../shared/consts/styles/static';
import { Link } from '../link';
import {
    pushNotification,
    showOutOfStockDialog,
    showProductPreview,
    showSignInView,
} from '../../hooks/useAppState';
import { useUser } from '../../modules/user';

const Styled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    /* border: 1px solid red; */
`;

const Center = styled(Styled)`
    justify-content: center;
    align-items: center;
`;

const StyledProductsNotFoundPage = styled(Center)`
    color: ${({ theme }) => theme.button.secondary.text};
    ${typography({ fontSize: '1.4rem', lineHeight: '2.1rem' })}
`;

const ProductsNotFoundPage = () => {
    return (
        <StyledProductsNotFoundPage>
            Товаров нет &#x1F622;
        </StyledProductsNotFoundPage>
    );
};

const CategoryNotFoundPage = () => {
    return (
        <StyledProductsNotFoundPage>
            Такой категории нет &#x1F622;
        </StyledProductsNotFoundPage>
    );
};

const LazyLoadingTrigger = styled.div`
    border: 1px solid transparent;
`;

export const ProductsPage = () => {
    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
    });

    const isAuthorized = useUser() !== null;

    const categoryId = useSearchParam('categoryId') ?? null;
    const { cash, call, status } = useApi(
        isAuthorized
            ? 'getProductsForProductPageForUser'
            : 'getProductsForProductPage',
    );

    const [products, setProducts] = useState<NonNullable<typeof cash>>({
        items: [],
        totalProductsCount: 0,
    });
    const [allFetched, setAllFetched] = useState(false);

    const fetchMoreProducts = async () => {
        if (status === 'loading') return;

        const limit = matchMediaBreakpoint('oneColumnInContentGrid')
            ? 5
            : matchMediaBreakpoint('twoColumnsInContentGrid')
              ? 10
              : matchMediaBreakpoint('threeColumnsInContentGrid')
                ? 15
                : 20;
        const response = await call({
            categoryId: categoryId,
            startIndex: products.items.length,
            limit,
        });
        if (response.isLeft()) return;
        setProducts((prev) => ({
            totalProductsCount: response.value.totalProductsCount,
            items: prev.items.concat(response.value.items),
        }));
        setAllFetched(
            response.value.totalProductsCount ===
                products.items.length + response.value.items.length,
        );
    };

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    useEffect(() => {
        if (entry !== null && entry.isIntersecting && !allFetched)
            fetchMoreProducts();
    }, [entry]);

    if (cash === null) return <PageLoader />;

    if (categoryId === null) return <CategoryNotFoundPage />;

    if (products.items.length === 0) return <ProductsNotFoundPage />;

    return (
        <>
            <ProductsView items={products.items} />
            {status === 'loading' && (
                <PageLoader size={'14px'} gap={'6px'} padding='80px 0' />
            )}
            <LazyLoadingTrigger ref={ref} />
        </>
    );
};

export const CardWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
    overflow: hidden;
    padding: 0 0 1px 0;

    flex-direction: column;
    justify-content: space-between;
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

const LikeButton = styled(IconButton)<{ $isLiked: boolean }>`
    ${({ $isLiked }) =>
        $isLiked &&
        css`
            svg {
                color: red;
            }
        `}
`;

const AddToCartButton = ({
    isAuthorized,
    productId,
}: {
    isAuthorized: boolean;
    productId: string;
}) => {
    const { call } = useApi('addProductToCart');

    const handleClick = async () => {
        if (!isAuthorized) return showSignInView();
        const response = await call({ productId, count: 1 });
        if (response.value === 'OutOfStock')
            return pushNotification('error', 'Товар закончился &#x1F622;');
        if (response.isRight())
            return pushNotification('success', 'Успешно добавлен в корзину');
    };

    return (
        <IconButton onClick={handleClick}>
            <PackagePlusIcon />
        </IconButton>
    );
};

const ProductCardView = ({
    id,
    name,
    price,
    isLiked,
    previewUrl,
    isAuthorized,
}: {
    id: string;
    name: string;
    price: string;
    previewUrl: string;
    isAuthorized: boolean;
    isLiked: boolean;
}) => {
    return (
        <CardWrapper>
            <ProductImage
                $url={previewUrl}
                to={['/product', { productId: id }]}
            />
            <ProductTypographyWrapper>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductTypographyWrapper>
            <ProductActionsWrapper>
                <BuyButton onClick={() => showProductPreview(id)}>
                    <Q>Просмотр</Q>
                </BuyButton>

                <LikeButton
                    $isLiked={isLiked}
                    onClick={() =>
                        isAuthorized
                            ? console.log('added to fav')
                            : showSignInView()
                    }
                >
                    <HeartIcon />
                </LikeButton>
                <AddToCartButton isAuthorized={isAuthorized} productId={id} />
            </ProductActionsWrapper>
            {/* <ProductName>{name}</ProductName>
            <ProductCardFooter>
                <Typography>20000 руб.</Typography>
                <A>
                    <BotIcon />
                </A>
                <A>
                    <BotIcon />
                </A>
            </ProductCardFooter> */}
            {/* <TextButton>awdawd</TextButton> */}

            {/* <IconButton>
                <BotIcon />
            </IconButton> */}
            {/* </ProductCardFooter> */}
        </CardWrapper>
    );
};

const Gr = styled(CardsGrid)`
    row-gap: 20px;
`;

const ProductsView = memo(
    ({
        items,
    }: {
        items: z.infer<
            (typeof apiSchema)['getProductsForProductPageForUser']['return']
        >['items'];
    }) => {
        const isAuthorized = useUser() !== null;
        return (
            <Gr>
                {items.map((item) => (
                    <ProductCardView
                        id={item.id}
                        key={item.id}
                        price={item.price.concat(' руб.')}
                        name={item.name}
                        isLiked={item.isLiked ?? false}
                        previewUrl={item.miniatures[0].url}
                        isAuthorized={isAuthorized}
                    />
                ))}
            </Gr>
        );
    },
);

const ProductCardFooter = styled.div`
    display: flex;
    /* border: 1px solid red; */
    width: 100%;
    justify-content: space-between;
    gap: 8px;
`;
