import { useAuthStatus } from '../../../modules/user';

export const AuthDependentView = (
    props: Record<ReturnType<typeof useAuthStatus>, React.ReactNode>,
) => {
    const status = useAuthStatus();
    return props[status];
};
