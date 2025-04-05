import usePokemonList from "../../hooks/usePokemonList";
import Pokemon from "../pokemon/pokemon";
import "./PokemonList.css";

// this file main aim is to download all the pokemon 
// and also align in good manner 
function PokemonList(){

    const [pokemonListState, setPokemonListState]=usePokemonList(false);
    // sbse phle return call hoga 
    // uske baad useEffect execute hoga 
    return (
        // <div>
        //     X : {x} <button onClick={()=>setX(x+1)}>Inc</button>
        //     <br />
        //     Y : {y} <button onClick={()=> setY(y+1)}>Dec</button>
        // </div>
        <div className="pokemone-list-wrapper">
            {/* and har pokemon ko uniquely identify krne ke liye key m pokemon ki id ko store kiya hai  */}
            <div className="pokemon-wrapper">
            {(pokemonListState.isLoading)? "loading....":pokemonListState.pokemonList.map((poke)=><Pokemon name={poke.name} image={poke.image} id={poke.id} key={poke.id} />)}

            </div>
            <div className="controls">
                <button disabled={pokemonListState.preUrl==null}  onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.preUrl})}>Prev</button>
                <button disabled={pokemonListState.nextUrl==null}  onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}>Next</button>
            </div>
            
        </div>
    )
}

export default PokemonList;