// isse hm hmare pokemon ko search kar payenge 
import { useState } from "react";
import "./Search.css";
import useDedounce from "../../hooks/useDebounce";
function Search({updateSearchTerm}){

    // const [searchItem, setSearchItem]=useState("");

    const debounceCallBack=useDedounce((e)=> updateSearchTerm(e.target.value))
    return (
        <div className="search-wrapper">
        <input 
            id="pokemon-name-search"
            type="text"
            placeholder="pokemon name....." 
            // agar input m kuch bhi chage hoga toh e m capture ho jayega 
            // onChange takes callback function 
            // hme yha Dedouncing ka concept use krna pdega 
            onChange={debounceCallBack}
        />
        </div>
    )
}

export default Search;