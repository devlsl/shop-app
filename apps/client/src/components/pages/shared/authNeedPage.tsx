import { useEffect } from 'react';
import { showSignInView } from '../../../hooks/useAppState';
import { useAuthStatus } from '../../../modules/user';
import { TextButton } from '../../buttons/textButton';
import styled from 'styled-components';
import { ButtonText } from '../../buttonText';
import { typography } from '../../../shared/utils/styles/typography';

export const AuthNeedPage = ({ children }: { children: React.ReactNode }) => {
    const authStatus = useAuthStatus();

    useEffect(() => {
        authStatus === 'unauthorized' && showSignInView();
    }, [authStatus]);

    if (authStatus !== 'authorized')
        return (
            <Center>
                <Typo>
                    Чтобы попасть, на эту страницу, необходимо войти в учётную
                    запись
                </Typo>
                <Btn onClick={showSignInView}>
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
