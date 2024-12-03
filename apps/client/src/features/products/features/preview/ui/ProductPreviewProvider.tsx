import { ProductPreviewPopup } from './ProductPreviewPopup';

export const ProductPreviewProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <>
        {children}
        <ProductPreviewPopup />
    </>
);
