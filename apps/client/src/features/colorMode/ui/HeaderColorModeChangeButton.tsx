import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleColorMode } from '../actions';
import { IconButton } from '../../../ui/buttons/iconButton';
import { useColorMode } from '../selectors';

export const HeaderColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <IconButton onClick={toggleColorMode}>
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    );
};
