import { useState } from "react";


function useToggle(initial=false){
    const [value , setValue] = useState(initial);
    const toggle = () => setValue((val)=>!val);

    return [value,toggle];

}

export default useToggle;