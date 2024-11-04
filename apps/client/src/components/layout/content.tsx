import styled from 'styled-components';
import { usePathname } from '../../modules/url';
import { Page } from '../../shared/types/page';
import { createMapWithDefaultValue } from '../../shared/utils/helpers/createMapWithDefaultValue';
import { CategoriesPage } from '../pages/categories';
import { container } from '../../shared/utils/styles/container';
import { ProductsPage } from '../pages/products';
import { CategoryPath } from '../pages/shared/categoryPath';

const pathnameToComponent = createMapWithDefaultValue<Page, React.ReactNode>(
    {
        '/products': <ProductsPage />,
        '/categories': <CategoriesPage />,
    },
    <div>default</div>,
);

const needShowCategoryPath = (pathname: string) => {
    if (pathname === '/products' || pathname === '/categories') {
        return <CategoryPath />;
    }
    return null;
};

const Styled = styled.div`
    ${container()}
    overflow: auto;
    height: 100%;
    align-self: center;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Content = () => {
    const pathname = usePathname();

    return (
        <Styled>
            {needShowCategoryPath(pathname)}
            {pathnameToComponent(pathname)}
        </Styled>
    );
};
