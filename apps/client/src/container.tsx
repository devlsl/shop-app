import styled from 'styled-components';
import { animate } from './utils/animate';

export const Container = styled.div`
    background-color: ${({ theme }) => (theme.isDark ? 'red' : 'green')};
    width: 100%;
    height: 100dvh;

    ${animate('background-color')}
`;
