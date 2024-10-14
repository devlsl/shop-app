import styles from './styles.module.css';
import { useScreenWidth } from './hooks/useScreenWidth';
import { useUser } from './hooks/useUser';
import { useEffect, useState } from 'react';
import { useApi } from './hooks/useApi';
import { PageLoader } from './components/pageLoader';
import { useTheme } from './hooks/useTheme';
import cn from 'classnames';
import { useMediaQuery } from './hooks/useMediaQuery';
import { AfterAuthPage } from './components/afterAuthPage';

const MobileToolbar = () => {
    const { user } = useUser();

    return (
        <div>
            <div>корзина</div>
            {user === null ? <div>войти</div> : <div>выйти</div>}
            <div>войти</div>
            <div>понравившиеся</div>
            <div>заказы</div>
        </div>
    );
};

const Auth = () => {
    const signInQuery = useApi('signInByEmailAndPassword', false);
    const signUpQuery = useApi('signUpByEmailAndPassword', false);
    const signOutQuery = useApi('signOut');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user } = useUser();

    return (
        <div>
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={() => signInQuery.call({ email, password })}>
                sign in
            </button>
            <br />
            <button onClick={() => signUpQuery.call({ email, password })}>
                sign up
            </button>
            <br />
            <button onClick={() => signOutQuery.call()}>sign out</button>
            {JSON.stringify(user)}
        </div>
    );
};

export const Layout = () => {
    const { call, status, data } = useApi('checkAuth', false);
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    useEffect(() => {
        call();
    }, []);

    useEffect(() => {
        if (data !== null) {
            useUser.setState({ user: data });
        }
    }, [data]);

    useEffect(() => {
        const handler = (ev: MediaQueryListEvent) =>
            useTheme.setState({ theme: ev.matches ? 'dark' : 'light' });
        const darkSchemeMediaMatcher = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );
        darkSchemeMediaMatcher.addEventListener('change', handler);
        return () =>
            darkSchemeMediaMatcher.removeEventListener('change', handler);
    }, []);

    let Content: JSX.Element;
    if (status === 'idle' || status === 'loading') {
        Content = <PageLoader />;
    } else {
        Content = <AfterAuthPage />;
    }

    // console.log()
    return <div className={cn(styles.wrapper)}>{Content}</div>;
};
