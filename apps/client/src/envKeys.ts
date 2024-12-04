export const envKeys = [
    'SERVER_HOSTNAME',
    'CLIENT_NAVIGATION_PARAMS_KEY',
] as const;

export type EnvKey = (typeof envKeys)[number];
