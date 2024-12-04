import styled from 'styled-components';
import { typography } from '../../../shared/styles/typography';
import { NotFoundPage } from '../../../shared/ui/NotFoundPage';
import { navigate } from '../actions';
import { ButtonText } from '../../../shared/ui/ButtonText';
import { TextButton } from '../../../shared/ui/TextButton';

const NotFoundPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const GoToCatalogButton = styled(TextButton)`
    height: 40px;
`;

const GoToCatalogButtonText = styled(ButtonText)`
    ${typography({
        fontSize: '1.1rem',
        lineHeight: '1.1rem',
        fontWeight: '600',
    })}
`;

export const DefaultPage = () => (
    <NotFoundPage>
        <NotFoundPageWrapper>
            <div>Такой страницы нет</div>
            <GoToCatalogButton onClick={() => navigate('categories')}>
                <GoToCatalogButtonText>Перейти в каталог</GoToCatalogButtonText>
            </GoToCatalogButton>
        </NotFoundPageWrapper>
    </NotFoundPage>
);
