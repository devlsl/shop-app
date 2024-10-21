import styled from 'styled-components';
import { Loader } from '../../uikit/loader';

const Stretch = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PageLoader = () => {
    return (
        <Stretch>
            <Loader />
        </Stretch>
    );
};
