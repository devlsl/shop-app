import { usePreviewState } from './state';

export const showProductPreview = (productId: string) =>
    usePreviewState.setState({
        shownProductId: productId,
    });

export const hideProductPreview = () =>
    usePreviewState.setState({
        shownProductId: null,
    });
