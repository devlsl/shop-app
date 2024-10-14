import { Circle } from '../circle';
import styles from './styles.module.css';
import cn from 'classnames';

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <Circle cssProps={cn(styles.every, styles.left)} />
            <Circle cssProps={cn(styles.every, styles.center)} />
            <Circle cssProps={cn(styles.every, styles.right)} />
        </div>
    );
};
