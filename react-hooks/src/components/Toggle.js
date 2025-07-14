import useToggle from "../hooks/useToggle";
import React from "react";

function Toggle(){
    const [buyNow, togglebuyNow] = useToggle(false);

    return(
        <div>
            <h2>buyNow Status</h2>
            <p>Status:{buyNow ? 'Order Placed' : 'Not Ordered'}</p>
            <button onClick={togglebuyNow}>Toggle Status</button>
        </div>
    );
}

export default Toggle;