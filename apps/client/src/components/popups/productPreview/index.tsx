import styled, { css } from 'styled-components';
import { PageLoader } from '../../pageLoader';
import { Link } from '../../../features/url';
import { useEffect } from 'react';
import { DialogContentWrapper } from '../shared/wrapper';
import { DialogOutlineButton } from '../shared/outlineButton';
import { Dialog } from '../shared';
import { ButtonText } from '../../buttonText';
import { AuthDependentView } from '../../../features/auth';
import { useApi } from '../../../features/api';
import { transition } from '../../../shared/styles/transition';
import { hover } from '../../../shared/styles/hover';
import {
    hideProductPreview,
    useShownProductPreview,
} from '../../../shared/hooks/useAppState';

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

export const ProductPreviewView = ({
    isAuthorized = false,
}: {
    isAuthorized?: boolean;
}) => {
    const shownProduct = useShownProductPreview();
    const { call, status, cash } = useApi(
        isAuthorized ? 'getProduct' : 'getProductForGuest',
    );

    useEffect(() => {
        if (shownProduct === null) return;
        call({ productId: shownProduct });
    }, [shownProduct]);

    if (cash === undefined) {
        hideProductPreview();
    }

    return (
        <Dialog
            maxWidth='400px'
            contentSlot={
                <DialogContentWrapper>
                    {status === 'success' && cash !== undefined ? (
                        <>
                            <ProductImage
                                $url={cash.media[0]?.url ?? ''}
                                onWillRedirect={hideProductPreview}
                                to={[
                                    'product',
                                    {
                                        productId: shownProduct,
                                        categoryId: cash.categoryId,
                                    },
                                ]}
                            />
                            <DialogOutlineButton onClick={hideProductPreview}>
                                <ButtonText $size='l'>Отменить</ButtonText>
                            </DialogOutlineButton>
                        </>
                    ) : (
                        <PageLoader size='16px' />
                    )}
                </DialogContentWrapper>
            }
            isOpen={shownProduct !== null}
            onClose={hideProductPreview}
            title={'sign in'}
            description={'sign in dialog'}
        />
    );
};

export const ProductPreview = () => (
    <AuthDependentView
        authorized={<ProductPreviewView isAuthorized />}
        checking={<PageLoader />}
        unauthorized={<ProductPreviewView />}
    />
);
