import { useEffect } from 'react';
import React from 'react';
import useHistoryState from 'react-use-history-state';
import ReactDOM from 'react-dom/client';

function Example() {
    const [state, setState, history] = useHistoryState<number>(5, 1000);

    useEffect(() => {
        setState(5);
        setState(4);
        setState(3);
        setState(100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>Current State: {state}</div>
            <div>
                Previous States:
                {history.map((elem: number, key: number) => (
                    <p key={key}>{elem}</p>
                ))}
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Example />
    </React.StrictMode>,
);
