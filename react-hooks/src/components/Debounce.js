import { useState } from "react";
import useDebounce from "../hooks/useDebounce";


function Debounce(){
    const [searchTerm, setSearchTerm] = useState('');
    const debounceSearch = useDebounce(searchTerm,1000);

    return(
        <div>
            <h2>Search Typing</h2>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..."/>
            <p>Search Term is: <strong>{debounceSearch}</strong></p>
        </div>
    );
}
export default Debounce;