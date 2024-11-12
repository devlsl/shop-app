import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const dotenvMap = Object.fromEntries(
        (await readFile(resolve(__dirname, '..', '..', '.env')))
            .toString()
            .split('\r\n')
            .filter((l) => l !== '')
            .map((l) => {
                const lineItems = l.split('=');
                const key = lineItems[0];
                let value = lineItems[1];
                if (value.charAt(0) === '"') value = value.slice(1);
                if (value.charAt(value.length - 1) === '"')
                    value = value.slice(0, -1);
                return [key, value];
            }),
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
