import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleColorMode } from '../actions';
import { useColorMode } from '../selectors';
import { FooterButton } from '../../../shared/ui/FooterButton';

export const FooterColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <FooterButton onClick={toggleColorMode}>
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </FooterButton>
    );
};
