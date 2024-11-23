import { Handlers, HandlersProps } from '../types';

export default (props: HandlersProps): Handlers['makeOrder'] =>
    async (context, payload) => {
        return {
            orderMade: true,
        };
    };
