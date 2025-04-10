import Search from "../Search/Search";
import PokemonList from "../PokemonList/PokemonList"
import "./Pokedex.css"
import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

// in this we will include all the maked folder 
// what are the main functionalities we have in the pokedex we will include in this 
function Pokedex(){
    // actualy we want that ki pura page pe kuch kam kar ske so yha 
    // likha hai pokedex m search m nhi 
    // search.jsx m toh use kiya hai 
    const [searchTerm, setSearchTerm]=useState('');

    // useEffect(()=>{

    // },[searchTerm]);
    return (
        <div className="pokedex-wrapper">
        <Search updateSearchTerm={setSearchTerm} />
        {/* {searchTerm} */}
        {/* condition  */}
        {/* if you write below condition tab ye only ek bar hi render hoga because searchTerm.length is not changing */}
        {/* {(searchTerm.length==0)? <PokemonList/> :<PokemonDetails pokemonName={searchTerm}/>} */}
        {/* agar hme kisi component m changes show krne kisi ke karan se toh usme key pass krdo and key m wo dalo jiske changes 
        se component rerender hona chahiye  */}
        {(searchTerm.length==0)? <PokemonList/> :<PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )
}

export default Pokedex;