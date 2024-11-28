import styled from 'styled-components';
import { typography } from '../../../shared/utils/styles/typography';

export const NotFoundPage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    
    align-items: center;
    color: ${({ theme }) => theme.button.secondary.text};
    ${typography({ fontSize: '1.4rem', lineHeight: '2.1rem' })}
`;
