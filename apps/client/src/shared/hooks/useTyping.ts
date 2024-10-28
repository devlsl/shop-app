import { useEffect, useRef, useState } from 'react';

export const useTyping = ({
    phrases,
    writeSpeed = 150,
    deleteSpeed = 100,
    deleteInterval = 2000,
    onWriteChar,
    onDelete,
    onUpdate,
    onUnmount,
    loop = true,
}: {
    phrases: string[];
    writeSpeed?: number;
    deleteSpeed?: number;
    deleteInterval?: number;
    onWriteChar: (character: string) => void;
    onUpdate: (value: string) => void;
    onDelete: () => void;
    onUnmount: () => void;
    loop?: boolean;
}) => {
    const [paused, setPaused] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const timeout = useRef<NodeJS.Timeout>();
    const printingRemainingPhrase = useRef('');
    const deletingRemainingPhrase = useRef('');
    const [remainingPhrases, setRemainingPhrases] = useState(
        phrases.flatMap((word) => [word, 0]),
    );

    useEffect(() => {
        if (paused) {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            onUpdate('');
            setRemainingPhrases(phrases.flatMap((word) => [word, 0]));
            return;
        }
    }, [paused]);
    useEffect(() => {
        if (paused) return;
        if (remainingPhrases.length === 0) return;
        if (remainingPhrases[0] === 1) {
            interval.current = setInterval(() => {
                if (deletingRemainingPhrase.current === '') {
                    clearInterval(interval.current);
                    setRemainingPhrases((prev) => prev.slice(1));
                } else {
                    onDelete();
                    deletingRemainingPhrase.current =
                        deletingRemainingPhrase.current.slice(0, -1);
                }
            }, deleteSpeed);
        } else if (remainingPhrases[0] === 0) {
            timeout.current = setTimeout(() => {
                setRemainingPhrases((prev) => [1, ...prev.slice(1)]);
            }, deleteInterval);
        } else {
            printingRemainingPhrase.current = remainingPhrases[0] as string;
            deletingRemainingPhrase.current = remainingPhrases[0] as string;
            interval.current = setInterval(() => {
                if (printingRemainingPhrase.current === '') {
                    clearInterval(interval.current);
                    setRemainingPhrases((prev) => {
                        if (loop) {
                            return prev.slice(1).concat([prev[0], 0]);
                        } else {
                            return prev.slice(1);
                        }
                    });
                } else {
                    onWriteChar(printingRemainingPhrase.current.charAt(0));
                    printingRemainingPhrase.current =
                        printingRemainingPhrase.current.slice(1);
                }
            }, writeSpeed);
        }
    }, [remainingPhrases, paused]);
    useEffect(() => {
        return () => {
            onUnmount();
            clearInterval(interval.current);
            clearTimeout(timeout.current);
        };
    }, []);

    return {
        start: () => setPaused(false),
        stop: () => setPaused(true),
    };
};
