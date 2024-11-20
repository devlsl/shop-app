import styled from 'styled-components';
import { typography } from '../shared/utils/styles/typography';

export const ButtonText = styled.span<{ $size?: 's' | 'm' | 'l' }>`
    ${({ $size = 'm' }) =>
        typography({
            fontSize:
                $size === 's' ? '0.6rem' : $size === 'm' ? '0.75rem' : '1rem',
            lineHeight:
                $size === 's'
                    ? '0.9rem'
                    : $size === 'm'
                      ? '1.125rem'
                      : '1.5rem',
            ...($size === 'l' ? { fontWeight: '600' } : {}),
        })}
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
