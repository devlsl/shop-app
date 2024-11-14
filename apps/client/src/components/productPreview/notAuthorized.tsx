import styled, { css } from 'styled-components';
import { useApi } from '../../hooks/useApi';
import {
    hideProductPreview,
    useShownProductPreview,
} from '../../hooks/useAppState';
import { hover } from '../../shared/utils/styles/hover';
import { transition } from '../../shared/utils/styles/transition';
import { Dialog } from '../dialog';
import { DialogOutlineButton } from '../dialog/outlineButton';
import { DialogContentWrapper } from '../dialog/wrapper';
import { PageLoader } from '../pageLoader';
import { Link } from '../link';
import { useEffect } from 'react';

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

export const NotAuthorizedProductPreview = () => {
    const shownProduct = useShownProductPreview();
    const { call, status, cash } = useApi('getProductPreview');

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
                                onWillRedirect={hideProductPreview}
                                $url={cash.media[0]?.url ?? ''}
                                to={['/product', { productId: shownProduct }]}
                            />
                            <DialogOutlineButton onClick={hideProductPreview}>
                                Отменить
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
