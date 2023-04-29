**Install**

```bash
npm install react-use-history-state
```

**Quickstart**

```tsx
export default function App() {
    const [state, setState, history] = useHistoryState<number>(5, 1000);

    useEffect(() => {
        setState(5);
        setState(4);
        setState(3);
    }, []);

    return (
        <div>
            {history.map((elem: number) => (
                <p>{elem}</p>
            ))}
        </div>
    );
}
```
