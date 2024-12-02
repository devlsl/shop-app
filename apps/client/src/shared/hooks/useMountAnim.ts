import { useEffect, useState } from 'react';
import { cssTimeToMs } from '../helpers/cssTimeToMs';

export const useMountAnim = (
    expected: boolean,
    duration: number | string,
    onUnmount?: () => void,
) => {
    const [unmounting, setUnmounting] = useState(false);
    const [mounted, setMounted] = useState(expected);

    const numericDuration =
        typeof duration === 'string' ? cssTimeToMs(duration) : duration;

    const handleExpectedChange = (nextValue: boolean) => {
        if (unmounting) return;
        if (mounted && !nextValue) {
            setUnmounting(true);
            return setTimeout(() => {
                setUnmounting(false);
                setMounted(false);
                onUnmount && onUnmount();
            }, numericDuration);
        }
        setMounted(nextValue);
    };

    useEffect(() => {
        handleExpectedChange(expected);
    }, [expected]);

    return {
        mounted,
        unmounting,
        styles: {
            animationDuration: `${numericDuration}ms`,
            animationFillMode: 'forwards',
        },
    };
};
