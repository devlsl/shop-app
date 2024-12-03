import styled from 'styled-components';
import { css } from 'styled-components';
import { Link, LinkProps } from '../../features/url';
import { transition } from '../../shared/styles/transition';
import { breakpoint } from '../../features/breakpoints';
import { hover } from '../../shared/styles/hover';

export const CardWrapper = styled(Link)`
    border-radius: 8px;
    background-color: ${({ theme }) => theme.button.secondary.background};
    ${transition('background-color', 'color', 'transform')}

    display: flex;
    gap: 16px;
    padding: 16px;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    /* border: 1px solid red; */
    aspect-ratio: 1;

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
            padding: 24px;
            gap: 20px;
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
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

export const Card = (
    props: LinkProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement> & {
            children?: React.ReactNode;
            imageUrlOrSlot?: React.ReactNode;
            aspectRatio?: string;
        }
    >,
) => {
    const { children, imageUrlOrSlot, aspectRatio, ...otherProps } = props;
    return (
        <CardWrapper {...otherProps}>
            <ImageWrapper>
                {typeof imageUrlOrSlot === 'string' ? (
                    aspectRatio === undefined ? (
                        <img src={imageUrlOrSlot} />
                    ) : (
                        <Image $imageUrl={imageUrlOrSlot} />
                    )
                ) : (
                    imageUrlOrSlot
                )}
            </ImageWrapper>
            {children}
        </CardWrapper>
    );
};
