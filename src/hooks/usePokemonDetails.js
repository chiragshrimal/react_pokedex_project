// in this file we are implementing pokemon details 

import axios from "axios";
import { useEffect, useState } from "react";
// import usePokemonList from "./usePokemonList";
// import Pokedex from "../components/Pokedex/Pokdex";

// *************************************************************************
// Hooks must be called at the top level of the component, not inside functions, conditionals, or loops.
function usePokemonDetails(id,pokemonName){

    const [pokemon,setPokemon]=useState({});

    async function downloadPokemonDetails(){
        try {
            let response="";
        if(pokemonName){
            response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        }else{
            response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        }
        // axios returns a promise object 
        const pokemonOfSameTypes= axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name: ""}`)

        // console.log("response.data.types",response.data.types);

        setPokemon((state)=>({
            ...state,
            name:response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height: response.data.height,
            types : response.data.types.map((t)=>t.type.name),
        }));

        // upper ke bjaye yha promise resolve karne se ye fayada hoga ki 
        // time kam lagega utne time kuch or kam kar liya jayega 
        pokemonOfSameTypes.then((response)=>{
            setPokemon((state)=>({
                ...state,
                similarPokemons:response.data.pokemon.slice(0,5)
            }));
    
        })
        // setPokemonListState((state)=>({
        //     ...state,
        //     type:response.data.types ? response.data.types[0].type.name: ""
        // }))
        } catch (error) {
            console.log("Something went wrong");
        }
        
    }

    // const[pokemonListState,setPokemonListState]=usePokemonList();
    // console.log("pokemonListState",pokemonListState);

    useEffect(()=>{
        downloadPokemonDetails();
        // console.log("hello");
        // console.log("list",pokemon.types);
        // if i passed pokemon variable in the dependency array 
        // then it will stuck into infinite variable 
        // you can see in the console in brawser 
    },[]);

    return [pokemon];
}

export default usePokemonDetails;
