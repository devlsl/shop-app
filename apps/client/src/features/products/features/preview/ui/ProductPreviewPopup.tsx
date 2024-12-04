import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { Link } from '../../../../navigation';
import { transition } from '../../../../../shared/styles/transition';
import { hover } from '../../../../../shared/styles/hover';
import { useApi } from '../../../../api';
import { hideProductPreview } from '../actions';
import {
    Popup,
    PopupContentWrapper,
    PopupOutlineButton,
} from '../../../../../shared/ui/Popup';
import { ButtonText } from '../../../../../shared/ui/ButtonText';
import { PageLoader } from '../../../../../shared/ui/PageLoader';
import { AuthDependentView } from '../../../../auth';
import { useShownProductPreviewId } from '../selectors';

const ProductImage = styled(Link)<{ $url: string }>`
    border-radius: 8px;

    ${transition('background-color', 'transform')}

    cursor: pointer;
    aspect-ratio: 4/5;
    background-image: url(${({ $url }) => $url});
    background-color: ${({ theme }) => theme.dialog.foreground.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.dialog.foreground.hover.background};
    `)}

    &:active {
        background-color: ${({ theme }) =>
            theme.dialog.foreground.active.background};
        transform: translateY(1px);
    }
`;

const ProductPreviewPopupContent = ({
    isAuthorized,
    productId,
}: {
    isAuthorized: boolean;
    productId: string | null;
}) => {
    const { call, status, cash } = useApi(
        isAuthorized ? 'getProduct' : 'getProductForGuest',
    );

    useEffect(() => {
        if (productId === null) return;
        call({ productId });
    }, [productId, isAuthorized]);

    if (cash === undefined) {
        hideProductPreview();
    }
    return (
        <PopupContentWrapper>
            {status === 'success' && cash !== undefined ? (
                <>
                    <ProductImage
                        $url={cash.media[0]?.url ?? ''}
                        onWillRedirect={hideProductPreview}
                        to={[
                            'product',
                            {
                                productId,
                                categoryId: cash.categoryId,
                            },
                        ]}
                    />
                    <PopupOutlineButton onClick={hideProductPreview}>
                        <ButtonText $size='l'>Отменить</ButtonText>
                    </PopupOutlineButton>
                </>
            ) : (
                <PageLoader size='16px' />
            )}
        </PopupContentWrapper>
    );
};

export const ProductPreviewView = ({
    isAuthorized = false,
}: {
    isAuthorized?: boolean;
}) => {
    const shownProductId = useShownProductPreviewId();
    return (
        <Popup
            maxWidth='400px'
            contentSlot={
                <ProductPreviewPopupContent
                    isAuthorized={isAuthorized}
                    productId={shownProductId}
                />
            }
            isOpen={shownProductId !== null}
            onClose={hideProductPreview}
            title={'sign in'}
            description={'sign in dialog'}
        />
    );
};

export const ProductPreviewPopup = () => (
    <AuthDependentView
        authorized={<ProductPreviewView isAuthorized />}
        checking={<PageLoader />}
        unauthorized={<ProductPreviewView />}
    />
);
