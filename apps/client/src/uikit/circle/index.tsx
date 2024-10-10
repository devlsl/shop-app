import styles from './styles.module.css';
import cn from 'classnames';

type Props = {
    cssProps: string;
};

export const Circle = ({ cssProps }: Props) => (
    <div className={cn(cssProps, styles.circle)} />
);
