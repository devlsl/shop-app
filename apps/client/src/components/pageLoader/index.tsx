import { Loader } from '../../uikit/loader';
import styles from './styles.module.css';

export const PageLoader = () => {
    return (
        <div className={styles.streach}>
            <Loader />
        </div>
    );
};
