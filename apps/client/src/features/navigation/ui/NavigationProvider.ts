import { usePopNavigationStateListener } from '../hooks';

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    usePopNavigationStateListener();
    return children;
};
