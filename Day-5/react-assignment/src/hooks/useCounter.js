import { useRef, useState } from "react";


function useCounter(initial=0){
    const [count, setCount] = useState(initial);
    const initialRef = useRef(initial);

    const increment = () => setCount((c)=>c+1);
    const decrement = () => setCount((c)=>c-1);
    const reset = () => setCount(initialRef.current);

    return {count, increment, decrement, reset};
}
export default useCounter;