import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { envKeys } from './src/envKeys';
import { getEnv } from './buildUtils/getEnv';

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const dotenvMap = await getEnv(
        resolve(__dirname, '..', '..', '.env'),
        envKeys,
    );

    return {
        plugins: [react()],
        define: {
            __APP_ENV__: dotenvMap,
        },
        optimizeDeps: {
            exclude: ['@shop/shared'],
        },
    };
});
