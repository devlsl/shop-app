import styled, { css } from 'styled-components';
import { breakpoint } from '../../features/breakpoints';
import { Suspense } from 'react';
import { useAuthStatus } from '../../features/auth';
import { PageLoader } from '../../shared/ui/PageLoader';
import { Header } from './header';
import { Footer } from './footer';
import { PageContent } from '../../features/navigation';

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
    const authStatus = useAuthStatus();
    console.log({ authStatus });
    if (authStatus === 'checking') return <PageLoader />;

    return (
        <Wrapper>
            <Suspense fallback={<PageLoader />}>
                <Header />
                <PageContent />
                <Footer />
            </Suspense>
        </Wrapper>
    );
};
