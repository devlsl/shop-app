import { useAuthStatus } from '../selectors';

export const AuthDependentView = (
    props: Record<ReturnType<typeof useAuthStatus>, React.ReactNode>,
) => {
    const status = useAuthStatus();
    return props[status];
};
