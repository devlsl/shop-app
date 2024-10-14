import { useEffect } from 'react';
import { useUrl } from './hooks/useUrl';
import { Layout } from './Layout';
import './fonts.css';
import './variables.css';
import './reset.css';
import './index.css';

function App() {
    useEffect(() => {
        window.addEventListener('popstate', useUrl.handlePopState);
        return window.removeEventListener('popstate', useUrl.handlePopState);
    }, []);

    return <Layout />;
}

export default App;
