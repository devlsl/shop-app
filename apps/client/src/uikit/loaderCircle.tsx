import styled, { css, keyframes } from 'styled-components';

const anim = (startColor: string, endColor: string) => keyframes`
    0% {
        background-color: ${startColor};
    }
    100% {
        background-color: ${endColor};
    }

`;

export const LoaderCircle = styled.div<{
    $delay: string;
    $duration: string;
    $startColor: string;
    $endColor: string;
    $size: string;
}>`
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    border-radius: 50%;
    background-color: ${({ $startColor }) => $startColor};

    animation: ${({ $delay, $duration, $startColor, $endColor }) => css`
        ${anim(
            $startColor,
            $endColor,
        )} ${$duration} infinite linear alternate ${$delay}
    `};
`;
