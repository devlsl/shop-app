import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleColorMode } from '../actions';
import { useColorMode } from '../hooks';
import { IconButton } from '../../../../components/buttons/iconButton';

export const HeaderColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <IconButton onClick={toggleColorMode}>
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    );
};
