import styled, { css } from 'styled-components';
import { container } from '../../shared/utils/styles/container';
import { transition } from '../../shared/utils/styles/transition';
import { breakpoint } from '../../shared/utils/styles/breakpointMedia';
import { typography } from '../../shared/utils/styles/typography';
import { hover } from '../../shared/utils/styles/hover';

const Catalog = styled.div`
    ${container()}
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(4, 1fr);
    ${breakpoint(
        'threeColumnsInContentGrid',
        css`
            grid-template-columns: repeat(3, 1fr);
        `,
    )}
    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            grid-template-columns: repeat(2, 1fr);
        `,
    )}
    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            grid-template-columns: repeat(1, 1fr);
        `,
    )} /* height: fit-content; */
`;

const CatalogItem = styled.a`
    border-radius: 8px;
    background-color: ${({ theme }) => theme.button.secondary.background};
    /* height: 250px; */
    ${transition('background-color', 'color', 'transform')}
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    gap: 16px;
    padding: 18px;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            padding: 24px;
            gap: 20px;
        `,
    )}

    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            padding: 36px;
            gap: 30px;
        `,
    )}

    ${hover(css`
        background-color: ${({ theme }) =>
            theme.button.secondary.hover.background};
    `)}
    color: ${({ theme }) => theme.button.secondary.text};

    &:active {
        background-color: ${({ theme }) =>
            theme.button.secondary.active.background};
        transform: translateY(1px);
    }

    cursor: pointer;
`;

const ImageWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.div<{ $imageUrl: string }>`
    /* height:  */
    background-image: url(${({ $imageUrl }) => $imageUrl});
    /* background-size: auto; */
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    /* aspect-ratio: 1; */
`;

const Title = styled.div`
    ${typography({
        fontWeight: 600,
        fontSize: '0.85rem',
        lineHeight: '0.85rem',
        letterSpacing: '0.3mm',
    })}
    max-width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    overflow-wrap: break-word;
    overflow: hidden;

    ${breakpoint(
        'twoColumnsInContentGrid',
        css`
            font-size: 1rem;
            line-height: 1rem;
        `,
    )}

    ${breakpoint(
        'oneColumnInContentGrid',
        css`
            font-size: 1.3rem;
            line-height: 1.3rem;
        `,
    )}

    color: ${({ theme }) => theme.button.secondary.text};

    ${transition('color')}
`;

const TitleWrapper = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
    flex-direction: column;
`;

const catalogItems = [
    { name: 'Смартфоны', imageUrl: '/phones.png' },
    { name: 'Ноутбуки', imageUrl: '/noytbyki.png' },
    { name: 'Планшеты', imageUrl: '/plansheti.png' },
    { name: 'Телевизоры', imageUrl: '/televizori.png' },
    { name: 'Умные часы\nи браслеты', imageUrl: '/ymnie_chasi_i_brasleti.png' },
    { name: 'Наушники', imageUrl: '/headphones.png' },
    { name: 'Аксессуары', imageUrl: '/accesuary.png' },
];

export const CatalogPage = () => {
    return (
        <Catalog>
            {catalogItems.map((item) => (
                <CatalogItem>
                    <ImageWrapper>
                        <Image $imageUrl={item.imageUrl} />
                    </ImageWrapper>
                    <TitleWrapper>
                        {item.name
                            .split('\n')
                            .slice(0, 2)
                            .map((phrase) => (
                                <Title>{phrase}</Title>
                            ))}
                    </TitleWrapper>
                </CatalogItem>
            ))}
        </Catalog>
    );
};
