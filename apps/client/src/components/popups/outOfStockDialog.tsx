import styled from 'styled-components';
import {
    hideOutOfStockDialog,
    useIsShownOutOfStockDialog,
} from '../../hooks/useAppState';
import { typography } from '../../shared/utils/styles/typography';
import { Dialog } from './shared';
import { DialogOutlineButton } from './shared/outlineButton';
import { DialogContentWrapper } from './shared/wrapper';
import { ButtonText } from '../buttonText';

const Center = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${typography({ fontSize: '1.4rem', lineHeight: '2.1rem' })}

    color: ${({ theme }) => theme.button.secondary.text};
`;

export const OutOfStockDialog = () => {
    const isShownOutOfStockDialog = useIsShownOutOfStockDialog();
    return (
        <Dialog
            contentSlot={
                <DialogContentWrapper>
                    <Center>Такой категории нет 😢</Center>
                    <DialogOutlineButton onClick={hideOutOfStockDialog}>
                        <ButtonText $size='l'>Закрыть</ButtonText>
                    </DialogOutlineButton>
                </DialogContentWrapper>
            }
            isOpen={isShownOutOfStockDialog}
            onClose={hideOutOfStockDialog}
            title={'sign in'}
            description={'sign in dialog'}
        />
    );
};
