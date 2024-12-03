import { usePreviewState } from './state';

export const useShownProductPreviewId = () =>
    usePreviewState((state) => state.shownProductId);
