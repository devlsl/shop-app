import styled, { css } from 'styled-components';
import { useApi } from '../../../hooks/useApi';
import {
    hideProductPreview,
    useShownProductPreview,
} from '../../../hooks/useAppState';
import { hover } from '../../../shared/utils/styles/hover';
import { transition } from '../../../shared/utils/styles/transition';

import { PageLoader } from '../../pageLoader';
import { Link } from '../../link';
import { useEffect } from 'react';
import { DialogContentWrapper } from '../shared/wrapper';
import { DialogOutlineButton } from '../shared/outlineButton';
import { Dialog } from '../shared';
import { ButtonText } from '../../buttonText';
import { getSearchParam } from '../../../modules/url';
import { AuthDependentView } from '../../pages/shared/authDependentView';

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
        isAuthorized ? 'getProductPreview' : 'getProductPreviewForGuest',
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
                                    '/product',
                                    {
                                        productId: shownProduct,
                                        categoryId:
                                            getSearchParam('categoryId'),
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
