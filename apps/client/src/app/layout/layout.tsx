import { useApi } from '../../hooks/useApi';
import { setUser } from '../../modules/user';
import { PageLoader } from '../../components/pageLoader';
import { AfterAuthPage } from '../../components/afterAuthPage';
import { pushNotification, useNotifications } from '../../hooks/useAppState';
import { NotificationsView } from '../../components/notifications/list';
import React, { useEffect } from 'react';
import { toggleTheme, useTheme } from '../../modules/theme';
import styled, { CSSProperties } from 'styled-components';
import {
    ClipboardList,
    Heart,
    Moon,
    ShoppingBag,
    ShoppingBasket,
    ShoppingCart,
    Sun,
} from 'lucide-react';
import { animate } from '../../utils/animate';
import { typographyCSS } from '../../utils/typography';
import { css } from 'styled-components';

const Stretch = styled.div`
    min-width: 100dvw;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => (theme.isDark ? '#2b2b2b' : '#ffffff')};
    ${animate('background-color')}
`;

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
`;

const Header = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-around;
`;

export const IconButton = styled.button`
    background-color: ${({ theme }) => (theme.isDark ? '#414141' : '#f1f1f1')};
    border-radius: 6px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        stroke-width: 2px;
        width: 24px;
        color: ${({ theme }) => (theme.isDark ? '#bababa' : '#353535')};
        ${animate('color')}
    }

    ${animate('background-color', 'transform')}

    &:hover {
        background-color: ${({ theme }) =>
            theme.isDark ? '#494949' : '#e5e5e5'};
    }

    &:active {
        background-color: ${({ theme }) =>
            theme.isDark ? '#4c4c4c' : '#d8d8d8'};

        transform: translateY(1px);
    }

    ${typographyCSS()}

    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

// function Button({ asChild, ...props }: any) {
//     const Comp = asChild ? Slot : 'button';
//     return <Comp {...props} />;
// }

// function Slot({ children }: { children?: React.ReactNode }) {
//     if (React.Children.count(children) > 1) {
//         throw new Error('Only one child allowed');
//     }
//     if (React.isValidElement(children)) {
//         return React.cloneElement(children);
//     }
//     return null;
// }

// const Flex = (
//     props: {
//         d?: CSSProperties['flexDirection'];
//         w?: CSSProperties['flexWrap'];
//         jc?: CSSProperties['justifyContent'];
//         ai?: CSSProperties['alignItems'];
//         ac?: CSSProperties['alignContent'];
//         g?: CSSProperties['gap'];
//         rg?: CSSProperties['rowGap'];
//         cg?: CSSProperties['columnGap'];
//     } & React.HTMLAttributes<HTMLDivElement> = {},
// ) => {
//     const {
//         d = 'row',
//         w = 'nowrap',
//         jc = 'flex-start',
//         ai = 'stretch',
//         ac = 'normal',
//         g,
//         rg,
//         cg,
//         ...other
//     } = props;
//     return styled.div.arguments(other)`
//         display: flex;
//         flex-direction: ${d};
//         flex-wrap: ${w};
//         justify-content: ${jc};
//         align-items: ${ai};
//         align-content: ${ac};
//         ${g &&
//         css`
//             gap: ${g};
//         `}
//         ${rg &&
//         css`
//             row-gap: ${rg};
//         `}
//     ${cg &&
//         css`
//             column-gap: ${cg};
//         `}
//     `;
// };

export const Layout = () => {
    const notifications = useNotifications();
    const { call, status, data } = useApi('checkAuth', false);
    useEffect(() => {
        call();
    }, []);

    useEffect(() => {
        if (data !== null) setUser(data);
    }, [data]);

    const theme = useTheme();

    if (status === 'idle' || status === 'loading') return <PageLoader />;

    return (
        <>
            <NotificationsView items={notifications} />
            <Stretch>
                <Container>
                    <Header>
                            <IconButton>
                                <ShoppingBag />
                            </IconButton>
                            <IconButton>
                                <Heart />
                            </IconButton>
                            <IconButton onClick={toggleTheme}>
                                {theme === 'dark' ? <Moon /> : <Sun />}
                            </IconButton>

                            <IconButton>
                                <ClipboardList />
                            </IconButton>
                    </Header>
                </Container>
            </Stretch>
        </>
    );
};
