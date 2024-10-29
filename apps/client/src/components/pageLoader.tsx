import styled, { useTheme } from 'styled-components';
import { Loader } from './loader';

const Stretch = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const PageLoader = () => {
    const theme = useTheme();

    return (
        <Stretch>
            <Loader
                startColor={theme.loader.onBackground.start}
                endColor={theme.loader.onBackground.end}
                gap={'6px'}
                padding={'0'}
                size={'24px'}
            />
        </Stretch>
    );
};
