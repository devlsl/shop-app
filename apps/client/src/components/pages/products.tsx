import styled from 'styled-components';
import { navigate, useSearchParam } from '../../modules/url';
import { useApi } from '../../hooks/useApi';
import { useEffect } from 'react';
import { PageLoader } from '../pageLoader';
import { Page } from '../../shared/types/page';

const Styled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* border: 1px solid red; */
`;

export const ProductsPage = () => {
    const categoryId = useSearchParam('categoryId') ?? null;
    const { cash, call } = useApi('getProductsForProductPage');

    useEffect(() => {
        call({ categoryId: categoryId });
    }, [categoryId]);

    if (categoryId === null) {
        return navigate('/categories' satisfies Page);
    }

    if (cash === null) return <PageLoader />;

    return <Styled>products</Styled>;
};
