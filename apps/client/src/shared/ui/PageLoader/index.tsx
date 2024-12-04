import styled, { css, useTheme } from 'styled-components';
import { Loader } from '../Loader';

const Stretch = styled.div<{ $absolute: boolean; $bgColor?: string }>`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    ${({ $absolute, $bgColor }) =>
        $absolute &&
        css`
            position: absolute;
            inset: 0;

            background-color: ${$bgColor === undefined ? 'inherit' : $bgColor};

            display: flex;
            justify-content: center;
            align-items: center;
        `}
`;

export const PageLoader = ({
    gap = '6px',
    size = '24px',
    padding = '0',
    absolute = false,
    startColor,
    endColor,
    bgColor,
}: {
    gap?: string;
    size?: string;
    padding?: string;
    absolute?: boolean;
    startColor?: string;
    endColor?: string;
    bgColor?: string;
}) => {
    const theme = useTheme();
    return (
        <Stretch $absolute={absolute} $bgColor={bgColor}>
            <Loader
                startColor={
                    startColor === undefined
                        ? theme.loader.onBackground.start
                        : startColor
                }
                endColor={
                    endColor === undefined
                        ? theme.loader.onBackground.end
                        : endColor
                }
                gap={gap}
                padding={padding}
                size={size}
            />
        </Stretch>
    );
};
