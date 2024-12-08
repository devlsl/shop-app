import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleColorMode } from '../actions';
import { useColorMode } from '../selectors';
import { IconButton } from '../../../shared/ui/IconButton';
import { Tooltip } from '../../../shared/ui/Tooltip';

export const HeaderColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <Tooltip
            content={colorMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        >
            <IconButton onClick={toggleColorMode}>
                {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
        </Tooltip>
    );
};
