import styled from 'styled-components';
import { LoaderCircle } from './loaderCircle';

export const Wrapper = styled.div`
    display: flex;
    gap: 4px;
`;

export const Loader = () => {
    return (
        <Wrapper>
            <LoaderCircle
                $delay='0ms'
                $duration='500ms'
                $startColor='red'
                $endColor='green'
                $size='40px'
            />
            <LoaderCircle
                $delay='150ms'
                $duration='500ms'
                $startColor='red'
                $endColor='green'
                $size='40px'
            />
            <LoaderCircle
                $delay='300ms'
                $duration='500ms'
                $startColor='red'
                $endColor='green'
                $size='40px'
            />
        </Wrapper>
    );
};
