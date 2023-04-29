import { useEffect, useState } from 'react';

export default function useHistoryState<T>(
    bufferSize: number,
    windowTime?: number,
    initialValue?: T,
) {
    const [bufferQueue, setBufferQueue] = useState<Array<T>>([]);

    const [currentValue, setCurrentValue] = useState<T>(initialValue);

    useEffect(() => {
        let x: ReturnType<typeof setInterval>;
        if (windowTime != null && windowTime !== 0) {
            x = setInterval(() => {
                bufferQueue.pop();
            }, windowTime);
        }
        return () => {
            clearInterval(x);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setValue(newValue: T) {
        const newBufferQueue = bufferQueue.slice(0);
        newBufferQueue.unshift(newValue);
        if (newBufferQueue.length > bufferSize) {
            newBufferQueue.pop();
        }
        setBufferQueue(() => newBufferQueue);
        setCurrentValue(newValue);
    }

    return [currentValue, bufferQueue, setValue];
}
