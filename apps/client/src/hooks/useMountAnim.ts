import { useEffect, useState } from 'react';

export const useMountAnim = (
    expected: boolean,
    duration: number,
): [
    mounted: boolean,
    unmounting: boolean,
    styles: {
        animationDuration: string;
        animationFillMode: string;
    },
] => {
    const [unmounting, setUnmounting] = useState(false);
    const [mounted, setMounted] = useState(expected);

    const handleExpectedChange = (nextValue: boolean) => {
        if (unmounting) return;
        if (mounted && !nextValue) {
            setUnmounting(true);
            return setTimeout(() => {
                setUnmounting(false);
                setMounted(false);
            }, duration);
        }
        setMounted(nextValue);
    };

    useEffect(() => {
        handleExpectedChange(expected);
    }, [expected]);

    return [
        mounted,
        unmounting,
        {
            animationDuration: `${duration}ms`,
            animationFillMode: 'forwards',
        },
    ];
};
