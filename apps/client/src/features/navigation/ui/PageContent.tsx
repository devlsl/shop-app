import styled from 'styled-components';
import { container } from '../../../shared/styles/container';
import { useNavigationParam } from '../selectors';
import { useEffect } from 'react';
import { navigate } from '../actions';
import { mapPageToComponent } from '../consts/mapPageToComponent';
import { CategoryBreadcrumbs } from '../../categories';

const ContentWrapper = styled.div`
    ${container()}
    overflow: auto;
    height: 100%;
    align-self: center;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const PageContent = () => {
    const page = useNavigationParam('page') ?? '';

    useEffect(() => {
        if (page === '') navigate('categories');
    }, [page]);

    return (
        <>
            <CategoryBreadcrumbs />
            <ContentWrapper>{mapPageToComponent(page)}</ContentWrapper>
        </>
    );
};
