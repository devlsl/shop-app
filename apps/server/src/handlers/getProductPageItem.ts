import { Handlers, HandlersProps } from '../types';
import { getProductPageItem } from './shared/getProductPageItem';

export default ({
        storage,
        STATIC_SERVER_HOSTNAME,
    }: HandlersProps): Handlers['getProductPageItem'] =>
    async (context, { productId }) =>
        getProductPageItem({
            storage,
            productId,
            staticServerHostname: STATIC_SERVER_HOSTNAME,
            context,
        });
