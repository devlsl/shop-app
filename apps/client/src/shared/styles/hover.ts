import { css, RuleSet } from 'styled-components';

export const hover = (styles: RuleSet<object>) => css`
    @media (hover: hover) {
        &:hover {
            ${styles}
        }
    }
`;
