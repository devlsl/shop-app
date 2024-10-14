import { useEffect } from 'react';
import { useMountAnim } from '../../hooks/useMountAnim';
import { useUser } from '../../hooks/useUser';
import { DialogDemo } from '../../uikit/dialog';
import { useAppState } from '../../hooks/useAppState';
import { useApi } from '../../hooks/useApi';
import { Button } from '../../uikit/button';
import { useTheme } from '../../hooks/useTheme';

export const AfterAuthPage = () => {
    const { user } = useUser();
    const showSignInView = useAppState((state) => state.showSignInView);
    const [
        isSignInDialogShowed,
        isSignInDialogUnmounting,
        signInDialogAnimStyles,
    ] = useMountAnim(showSignInView, 150);

    const {
        call: signIn,
        status: signInStatus,
        data: signInData,
    } = useApi('signInByEmailAndPassword');
    const { call: signOut, status: signOutStatus } = useApi('signOut');
    console.log(user);

    useEffect(() => {
        if (signOutStatus === 'success') {
            useUser.setState({ user: null });
        }
    }, [signOutStatus]);

    useEffect(() => {
        if (signInStatus === 'success') {
            useUser.setState({ user: signInData });
        }
    }, [signInStatus]);

    if (user === undefined) {
        return null;
    }

    const isGuest = user === null;
    // const isAdmin = user?.role === 'admin';
    // const isUser = user?.role === 'user';
    console.log(isGuest);
    return (
        <div>
            {isGuest ? (
                <>
                    <Button
                        onClick={() => signIn({ email: '1', password: '1' })}
                    >
                        sign in
                    </Button>

                    <DialogDemo
                        mounted={isSignInDialogShowed}
                        unmounting={isSignInDialogUnmounting}
                        toggle={(value) =>
                            useAppState.setState({ showSignInView: value })
                        }
                        animStyles={signInDialogAnimStyles}
                    />
                </>
            ) : (
                <Button onClick={() => signOut()}>sign out</Button>
            )}
            <div style={{ display: 'flex', gap: '20px' }}>
                <Button
                    onClick={() => {
                        isGuest
                            ? useAppState.setState((prev) => ({
                                  showSignInView: !prev.showSignInView,
                              }))
                            : alert('корзина');
                    }}
                >
                    карзина
                </Button>
                <Button
                    onClick={() =>
                        isGuest
                            ? useAppState.setState((prev) => ({
                                  showSignInView: !prev.showSignInView,
                              }))
                            : alert('заказы')
                    }
                >
                    заказы
                </Button>
            </div>
            <br />
            <br />
            hello {isGuest ? 'guest' : user.role}
            <br />
            <br />
            <Button
                onClick={() =>
                    useTheme.setState((prev) => ({
                        theme: prev.theme === 'dark' ? 'light' : 'dark',
                    }))
                }
            >
                change theme
            </Button>
            <Button isLoading={true}>sign in</Button>
        </div>
    );
};
