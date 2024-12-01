import { MoonIcon, SunIcon } from 'lucide-react';
import { FooterButton } from '../../../../components/buttons/footerButton';
import { toggleColorMode } from '../actions';
import { useColorMode } from '../selectors';

export const FooterColorModeChangeButton = () => {
    const colorMode = useColorMode();
    return (
        <FooterButton onClick={toggleColorMode}>
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </FooterButton>
    );
};
