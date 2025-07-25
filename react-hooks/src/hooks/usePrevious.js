import { useEffect, useRef } from "react";


function usePrevious(value){
    const ref = useRef(undefined);

    useEffect(()=>{
        ref.current = value;
    },[value]);
    return ref.current;
}

export default usePrevious;