import styled from 'styled-components';
import { FlashingCircle } from './flashingCircle';
import { staticStyles } from '../shared/consts/staticStyles';

const Wrapper = styled.div<{
    $gap: string;
    $padding: string;
}>`
    display: flex;
    gap: ${({ $gap }) => $gap};
    padding: ${({ $padding }) => $padding};
`;

export const Loader = ({
    gap,
    padding,
    size,
    startColor,
    endColor,
}: {
    gap: string;
    size: string;
    padding: string;
    startColor: string;
    endColor: string;
}) => {
    return (
        <Wrapper $gap={gap} $padding={padding}>
            <FlashingCircle
                $delay='0ms'
                $duration={staticStyles.loader.flashingDuration}
                $size={size}
                $startColor={startColor}
                $endColor={endColor}
            />
            <FlashingCircle
                $delay={staticStyles.loader.flashingDelay + 'ms'}
                $duration={staticStyles.loader.flashingDuration}
                $size={size}
                $startColor={startColor}
                $endColor={endColor}
            />
            <FlashingCircle
                $delay={2 * staticStyles.loader.flashingDelay + 'ms'}
                $duration={staticStyles.loader.flashingDuration}
                $size={size}
                $startColor={startColor}
                $endColor={endColor}
            />
        </Wrapper>
    );
};
