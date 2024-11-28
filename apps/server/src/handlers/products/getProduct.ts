import { Handlers, HandlersProps } from '../../types';
import { getProduct } from '../shared/collectProduct';

export default ({
        storage,
        STATIC_SERVER_HOSTNAME,
    }: HandlersProps): Handlers['getProduct'] =>
    async (context, { productId }) =>
        getProduct({
            storage,
            productId,
            staticServerHostname: STATIC_SERVER_HOSTNAME,
            context,
        });
