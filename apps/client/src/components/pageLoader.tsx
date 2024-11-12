import styled, { useTheme } from 'styled-components';
import { Loader } from './loader';

const Stretch = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const PageLoader = ({
    gap = '6px',
    size = '24px',
    padding = '0',
}: {
    gap?: string;
    size?: string;
    padding?: string;
}) => {
    const theme = useTheme();

    return (
        <Stretch>
            <Loader
                startColor={theme.loader.onBackground.start}
                endColor={theme.loader.onBackground.end}
                gap={gap}
                padding={padding}
                size={size}
            />
        </Stretch>
    );
};
