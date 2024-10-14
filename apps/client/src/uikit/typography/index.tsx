import cn from 'classnames';
import styles from './styles.module.css';

type Props = {
    weight?:
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    style?: React.CSSProperties['fontStyle'];
    size?: string;
    className?: string;
    as?: React.ElementType;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLOrSVGElement>;

export const Typography = ({
    weight = '300',
    style = 'normal',
    size = '14px',
    as: Tag = 'span',
    className,
    children,
    ...otherProps
}: Props) => {
    const cssProps: React.CSSProperties = {
        fontWeight: weight,
        fontStyle: style,
        fontSize: size,
    };

    return (
        <Tag
            style={cssProps}
            {...otherProps}
            className={cn(styles.typography, className)}
        >
            {children}
        </Tag>
    );
};
