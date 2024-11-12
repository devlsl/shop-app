/// <reference types="vite/client" />

// interface ImportMetaEnv {
//     readonly STATIC_SERVER_HOSTNAME: string;
//     readonly STATIC_SERVER_PORT: string;

//     readonly SERVER_HOSTNAME: string;
//     readonly SERVER_PORT: string;

//     readonly CLIENT_HOSTNAME: string;
//     readonly CLIENT_PORT: string;
// }

// interface ImportMeta {
//     readonly env: ImportMetaEnv;
// }
declare const __APP_ENV__: Record<
    | 'STATIC_SERVER_HOSTNAME'
    | 'STATIC_SERVER_PORT'
    | 'SERVER_HOSTNAME'
    | 'SERVER_PORT'
    | 'CLIENT_HOSTNAME'
    | 'CLIENT_PORT',
    string
>;
