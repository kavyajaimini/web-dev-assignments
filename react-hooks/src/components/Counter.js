import React from "react";
import useCounter from "../hooks/useCounter";


function Counter(){
    const {count, increment, decrement, reset} = useCounter(0);

    return(
        <div>
            <h2>Counter</h2>
            <p>Count: {count}</p>
            <button onClick={increment}>Add +1</button>
            <button onClick={decrement}>Subtract -1</button>
            <button onClick={reset}>Reset to 0</button>
        </div>
    );
}

export default Counter;