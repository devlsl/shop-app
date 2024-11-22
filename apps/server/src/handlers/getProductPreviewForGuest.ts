import { Handlers, HandlersProps } from '../types';

export default (props: HandlersProps): Handlers['getProductPreviewForGuest'] =>
    async (payload) => {
        const product = (await props.storage.product.get()).find(
            (p) => p.id === payload.productId,
        );

        if (product === undefined) return undefined;

        return {
            id: product.id,
            media: product.media
                .filter((m) => m.type === 'image')
                .map((m) => ({
                    url: `${props.STATIC_SERVER_HOSTNAME}/${m.sizes.main}`,
                })),
            leftInStock: product.leftInStock,
            name: product.name,
            price: product.price,
        };
    };
