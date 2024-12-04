import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleColorMode } from '../actions';
import { useColorMode } from '../selectors';
import { IconButton } from '../../../shared/ui/IconButton';

export const HeaderColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <IconButton onClick={toggleColorMode}>
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    );
};
