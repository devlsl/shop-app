import { ProductFiltersPopup } from './ProductFiltersPopup';

export const ProductFiltersProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <>
        {children}
        <ProductFiltersPopup />
    </>
);
