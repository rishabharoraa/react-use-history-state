import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';

export default function useHistoryState<T>(
    bufferSize: number,
    windowTime?: number,
    initialValue?: T,
): [T, Dispatch<SetStateAction<T>>, Array<T>] {
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

    const setValue: Dispatch<SetStateAction<T>> = (
        dispatch: T | ((prevState: T) => T),
    ) => {
        const newBufferQueue = bufferQueue.slice(0);
        newBufferQueue.unshift(currentValue);
        if (newBufferQueue.length > bufferSize) {
            newBufferQueue.pop();
        }
        setBufferQueue(() => newBufferQueue);
        setCurrentValue(dispatch);
    };
    const memoizedSetValue = useCallback(setValue, [
        bufferQueue,
        bufferSize,
        currentValue,
    ]);

    return [currentValue, memoizedSetValue, bufferQueue];
}
