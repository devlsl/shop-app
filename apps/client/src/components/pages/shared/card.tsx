import styled from 'styled-components';
import { transition } from '../../../shared/utils/styles/transition';
import { breakpoint } from '../../../shared/utils/styles/breakpointMedia';
import { css } from 'styled-components';
import { hover } from '../../../shared/utils/styles/hover';

const CardWrapper = styled.button<{ $aspectRatio: string }>`
    border-radius: 8px;
    background-color: ${({ theme }) => theme.button.secondary.background};

    ${transition('background-color', 'color', 'transform')}
    width: 100%;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
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
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

export const Card = (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children?: React.ReactNode;
        imageUrlOrSlot?: React.ReactNode;
        aspectRatio?: string;
    },
) => {
    const {
        children,
        imageUrlOrSlot,
        aspectRatio = '1',
        ...otherProps
    } = props;
    return (
        <CardWrapper $aspectRatio={aspectRatio} {...otherProps}>
            <ImageWrapper>
                {typeof imageUrlOrSlot === 'string' ? (
                    <Image $imageUrl={imageUrlOrSlot} />
                ) : (
                    imageUrlOrSlot
                )}
            </ImageWrapper>
            {children}
        </CardWrapper>
    );
};
