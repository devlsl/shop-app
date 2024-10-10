import { useState } from 'react';
import { Button } from './uikit/button';
import styles from './styles.module.css';

export const Layout = () => {
    const [isLoading, setLoading] = useState(false);
    return (
        <div className={styles.wrapper}>
            <Button isLoading={isLoading}>Subscribe</Button>
            <Button onClick={() => setLoading((prev) => !prev)}>
                toggleLoading
            </Button>
        </div>
    );
};
