import Search from "../Search/Search";
import PokemonList from "../PokemonList/PokemonList"
import "./Pokedex.css"

// in this we will include all the maked folder 
// what are the main functionalities we have in the pokedex we will include in this 
function Pokedex(){

    return (
        <div className="pokedex-wrapper">
        <Search/>
        <PokemonList/>
        </div>
    )
}

export default Pokedex;