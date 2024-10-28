import styled from 'styled-components';
import { LoaderCircle } from './loaderCircle';
import { useTheme } from '../modules/theme';

export const Wrapper = styled.div`
    display: flex;
    gap: 6px;
`;

export const Circle = ({ delay }: { delay: string }) => {
    const theme = useTheme();
    return (
        <LoaderCircle
            $delay={delay}
            $duration='800ms'
            $startColor={theme === 'dark' ? '#3b3b3b' : '#eaeaea'}
            $endColor={theme === 'dark' ? '#525252' : '#cbcbcb'}
            $size='14px'
        />
    );
};

export const Loader = () => {
    return (
        <Wrapper>
            <Circle delay='0ms' />
            <Circle delay='400ms' />
            <Circle delay='800ms' />
        </Wrapper>
    );
};
