import styled, { useTheme } from 'styled-components';
import { Loader } from './loader';

const Stretch = styled.div`
    position: absolute;
    inset: 0;

    background-color: ${({ theme }) => theme.dialog.foreground.background};

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonLoader = () => {
    const theme = useTheme();

    return (
        <Stretch>
            <Loader
                startColor={theme.dialog.loader.start}
                endColor={theme.dialog.loader.end}
                gap={'6px'}
                padding={'0'}
                size={'10px'}
            />
        </Stretch>
    );
};
