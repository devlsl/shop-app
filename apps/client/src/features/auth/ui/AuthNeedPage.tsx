import { useEffect } from 'react';
import styled from 'styled-components';
import { showSignInPopup } from '../actions';
import { useAuthStatus } from '../selectors';
import { ButtonText } from '../../../shared/ui/ButtonText';
import { typography } from '../../../shared/styles/typography';
import { TextButton } from '../../../shared/ui/TextButton';

export const AuthNeedPage = ({ children }: { children: React.ReactNode }) => {
    const authStatus = useAuthStatus();

    useEffect(() => {
        authStatus === 'unauthorized' && showSignInPopup();
    }, [authStatus]);

    if (authStatus !== 'authorized')
        return (
            <Center>
                <Typo>
                    Чтобы попасть, на эту страницу, необходимо войти в учётную
                    запись
                </Typo>
                <Btn onClick={showSignInPopup}>
                    <ButtonText $size='l'>Войти</ButtonText>
                </Btn>
            </Center>
        );

    return children;
};

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100%;
    gap: 20px;
`;

const Btn = styled(TextButton)`
    height: 36px;
`;

const Typo = styled.span`
    ${typography({
        fontSize: '1.2rem',
        lineHeight: '1.8rem',
        fontWeight: '500',
    })}
    max-width: 400px;
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.button.secondary.text};
`;
