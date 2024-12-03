import { ProductFiltersProvider } from '../features/filters';
import { ProductPreviewProvider } from '../features/preview';

export const ProductsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <ProductFiltersProvider>
        <ProductPreviewProvider>{children}</ProductPreviewProvider>
    </ProductFiltersProvider>
);
