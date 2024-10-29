import styled from 'styled-components';
import { usePathname } from '../../modules/url';
import { Page } from '../../shared/types/page';
import { createMapWithDefaultValue } from '../../shared/utils/helpers/createMapWithDefaultValue';
import { CatalogPage } from '../pages/catalog';
import { container } from '../../shared/utils/styles/container';

const pathnameToComponent = createMapWithDefaultValue<Page, React.ReactNode>(
    {
        '/catalog': <div>catalog</div>,
        '/categories': <CatalogPage />,
    },
    <div>default</div>,
);

const Styled = styled.div`
    ${container()}
    overflow: auto;
    height: 100%;
    align-self: center;
    padding: 0 8px;
`;

export const Content = () => {
    const pathname = usePathname();
    return <Styled>{pathnameToComponent(pathname)}</Styled>;
};
