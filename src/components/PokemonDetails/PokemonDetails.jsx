import { useParams } from "react-router-dom"
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails(){
    // jab bhi ise call kiya jayega ye url mese se id nikal lega 
    const {id}=useParams();
    // console.log("id",id);
    const[pokemon]=usePokemonDetails(id);
    // console.log("pokemonType : ", pokemon.types);

    return (
        <div className="pokemon-details-wrapper">
            <img  className="pokemon-details-image" src={pokemon.image}  />
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-name"> Height : {pokemon.height}</div>
            <div className="pokemon-details-name">Weight : {pokemon.weight}</div>
            <div className="pokemon-details-types"> 
                { (pokemon.types) && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>

            <div>
                {
                    pokemon.types && pokemon.similarPokemons &&
                    <div>
                        more {pokemon.types[0]} type pokemons
                        <ul>
                            {pokemon.similarPokemons.map((p)=><li key={p.pokemon.name}>{p.pokemon.name}</li>)}
                        </ul>
                    </div>
                }
            </div>

        </div>
    )
}

export default PokemonDetails