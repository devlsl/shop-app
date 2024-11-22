import { Handlers, HandlersProps } from '../types';

export default (_: HandlersProps): Handlers['checkAuth'] =>
    async (context) =>
        context;
