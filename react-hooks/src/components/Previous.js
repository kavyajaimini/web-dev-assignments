import { useState } from "react";
import usePrevious  from  "../hooks/usePrevious";


function Previous(){
    const [score, setScore] = useState(0);
    const prevScore=usePrevious(score);

    return(
        <div>
            <h2>Score</h2>
            <p>Current: {score} | Previous: {prevScore ?? 'N/A'}</p>
            <button onClick={()=>setScore(score+1)}>Increase</button>
        </div>
    );
}

export default Previous;