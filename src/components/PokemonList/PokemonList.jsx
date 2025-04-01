// use Effect is a another hook 
// jab bhi hme loading ke time kuch kam krana hai tab ye use karte hai
// ya jab bhi changes ho rhe hai tab kya krana hai  
// callback always tab toh execute hoga hi jab phli bar render ho rha hai************
// useEffect m dependency array ka bhut bda role hai 
// agr aapne dependency array nhi diya toh jab kuch bhi change hoge toh pura ka pura 
// callback rerender ho ga 
// but dependency array ke use krne se upper wali chiz ko solve kiya ja skta hai 
// callback m wo likhte jo perform krna hai 
// and dependency list m do likhte jiske changes par krana hai 
// inspect m jake console m analyze kro 
// agar apne khali array pass kiya hai toh ye kisi pe bhi depend nhi karega only first time load hoga 
// agar pass hi nhi kiya tab toh ye kisike bhi load hone ya rerender hone pe fir se callback hoga 
import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../pokemon/pokemon";
import "./PokemonList.css";

function PokemonList(){

    // const [x,setX]=useState(0);
    // const [y,setY]=useState(0);

    // Agar data ko download karke leke aana khi se toh 
    // 1. fetch 
    // 2. axios  use krte hai (generally hum always axios hi use karenge ) ye ek promise return karta hai 

    // always isi trh se data fetch karte hai

    const [pokemonList,setpokemonList]=useState([]);
    const [isLoading,setisLoading]=useState(true);

    const POKEDEX_URL="https://pokeapi.co/api/v2/pokemon";

    async function  DownloadPokemon(){
        // this downloads list of 20 pokemons 
        const response= await axios.get(POKEDEX_URL);

        // we get the array of pokemons from result
        const pokemonResults=response.data.results;
        console.log(response.data);

        // iterating over the array of pokemons , and using their url , 
        // to create an array of promises
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        // axios have some property that all 
        // that takes array of promises 
        // promises ko evaluate krne m time toh lgega 
        // array of object(pokemon details)
        const pokemonData= await axios.all(pokemonResultPromise);
        console.log(pokemonData);

        // now iterate on the data of each pokemon, and extract id , name , image , types
        const res=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                type:pokemon.types
            }
        });

        console.log(res);
        setpokemonList(res);
        setisLoading(false);
    }

    useEffect(()=>{
        DownloadPokemon();
    },[]);
    // sbse phle return call hoga 
    // uske baad useEffect execute hoga 
    return (
        // <div>
        //     X : {x} <button onClick={()=>setX(x+1)}>Inc</button>
        //     <br />
        //     Y : {y} <button onClick={()=> setY(y+1)}>Dec</button>
        // </div>
        <div className="pokemone-list-wrapper">
            <h1>List of Pokemons</h1>
            {/* and har pokemon ko uniquely identify krne ke liye key m pokemon ki id ko store kiya hai  */}
            {(isLoading)? "loading....":pokemonList.map((poke)=><Pokemon name={poke.name} image={poke.image} key={poke.id}/>)}
        </div>
    )
}

export default PokemonList;