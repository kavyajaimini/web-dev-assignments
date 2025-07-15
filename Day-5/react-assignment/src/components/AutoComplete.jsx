import React, { useEffect, useState } from 'react'
import "./AutoComplete.css";

const AutoComplete = ({data}) => {
    const [inputValue , setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
    console.log("Suggestions received from parent:", data);
    }, [data]);


    const handleText = (e) => {
  const val = e.target.value;
  setInputValue(val);

  if (val.trim() === '') {
    setFilteredSuggestions([]);
    setShowDropdown(false);
  } else {
    const results = data
      .filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      )
      .sort((a, b) =>
        a.toLowerCase().startsWith(val.toLowerCase()) ? -1 : 1
      )
      .slice(0, 5);

    setFilteredSuggestions(results);
    setShowDropdown(results.length > 0);
  }
};
    const handleSuggestions = (selectedText) =>{
        setInputValue(selectedText);
        setFilteredSuggestions([]);
        setShowDropdown(false);
    }
  return (
    <div className='search-suggest'>
        <input type="text" value={inputValue} onChange={handleText} onBlur={()=> setTimeout(()=> setShowDropdown(false),100)}
        onFocus={()=>{
            if(inputValue.trim()!=='' && filteredSuggestions.length>0){
                setShowDropdown(true);
            }
        }}
        className='search-field' placeholder='Search...'/>
        {showDropdown && filteredSuggestions.length > 0 && (
            <ul className='search-list'>{filteredSuggestions.map((item,idx)=>(
                <li 
                key={idx}
                onMouseDown={()=>handleSuggestions(item)}
                className='search-items'
                >
                    {item}
                </li>
            ))}
            </ul>
        )}

    </div>
  )
}

export default AutoComplete;