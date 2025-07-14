import useLocalStorage from "../hooks/useLocalStorage";
import React, { useEffect } from 'react';

function LocalStorage(){
    const [theme, setTheme] = useLocalStorage('theme','light');

    useEffect(() => {
        document.body.className = ''; 
        document.body.classList.add(theme); 
    }, [theme]);

    const toggleTheme=()=>{
        setTheme(prev=>(prev==='light' ? 'dark' : 'light'));
    };
    
    return(
        <div>
            <h2>Theme Toggle</h2>
            <p>Current Theme : <strong>{theme}</strong></p>
            <button onClick={toggleTheme}>Switch Theme!</button>
        </div>
    );
}

export default LocalStorage;