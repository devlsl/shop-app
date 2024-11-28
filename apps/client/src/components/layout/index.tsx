import styled, { css } from 'styled-components';
import { useUser } from '../../modules/user';
import { Content } from './content';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';
import { PageLoader } from '../pageLoader';
import { Header } from './header';
import { Footer } from './footer';
import { Popups } from '../popups';
import { Suspense } from 'react';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    padding: 8px 0;
    ${breakpoint(
        'showBottomBar',
        css`
            padding-bottom: 0;
        `,
    )}
`;

export const Layout = () => {
    const user = useUser();

    if (user === undefined) return <PageLoader />;

    return (
        <Wrapper>
            <Suspense fallback={<PageLoader />}>
                <Header />
                <Content />
                <Footer />

                <Popups />
            </Suspense>
        </Wrapper>
    );
};
