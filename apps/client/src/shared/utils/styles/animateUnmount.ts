import { css, keyframes } from 'styled-components';

export const animateUnmount = (
    unmounting: boolean,
    mountAnim: ReturnType<typeof keyframes>,
    unmountAnim: ReturnType<typeof keyframes>,
) => css`
    animation-name: ${mountAnim};
    ${unmounting &&
    css`
        animation-name: ${unmountAnim};
    `}
`;
