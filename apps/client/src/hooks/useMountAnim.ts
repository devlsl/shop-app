import { useEffect, useState } from 'react';

export const useMountAnim = (
    expected: boolean,
    duration: number,
    onUnmount?: () => void,
) => {
    const [unmounting, setUnmounting] = useState(false);
    const [mounted, setMounted] = useState(expected);

    const handleExpectedChange = (nextValue: boolean) => {
        if (unmounting) return;
        if (mounted && !nextValue) {
            setUnmounting(true);
            return setTimeout(() => {
                setUnmounting(false);
                setMounted(false);
                onUnmount && onUnmount();
            }, duration);
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
            animationDuration: `${duration}ms`,
            animationFillMode: 'forwards',
        },
    };
};
