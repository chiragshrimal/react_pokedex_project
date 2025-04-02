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

// this file main aim is to download all the pokemon 
// and also align in good manner 
function PokemonList(){

    // const [x,setX]=useState(0);
    // const [y,setY]=useState(0);

    // Agar data ko download karke leke aana khi se toh 
    // 1. fetch 
    // 2. axios  use krte hai (generally hum always axios hi use karenge ) ye ek promise return karta hai 

    // always isi trh se data fetch karte hai

    // hm in sabhi useState ko  ek object m store kar skte hai  

    // const [pokemonList,setPokemonList]=useState([]);
    // const [isLoading,setIsLoading]=useState(true);

    // const [preUrl,setPreUrl]=useState("");
    // const [nextUrl,setNextUrl]=useState("");

    // const [pokedexUrl,setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon");

    const [pokemonListState,setPokemonListState]=useState({
        pokemonList: [],
        isLoading:true,
        preUrl:"",
        nextUrl : "",
        pokedexUrl : "https://pokeapi.co/api/v2/pokemon"
    })

    // ************************************************************************************
    // ******************************************************************************************
    // in the below case finally number m 1 store hoga because you are calling 
    // again and again so , always final changes ko consider kiya jata hai 
    // isme sare ke sare same state ke ek bar m execute hote hai 
    // const [number,setNumber]=useState(0);
    // return (
    //     <button onClick={()=>setNumber(number + 1) setNumber(number + 1) setNumber(number + 1)}>+3</button>
    // 
    // )

//  is problem ko solve krne ke liye 
// we can pass callback function in the setNumber function
// but agar aap object ko callback function m pass krke krte ho toh queue ke trh execute hote hai
     // const [number,setNumber]=useState(0);
    // return (
    //     <button onClick={()=>setNumber((n)=>n+1) setNumber((n)=>n+1) setNumber((n)=>n+1)}>+3</button>
    // 
    // )

    // so in the below function we also took mistake that 
    // we are again and again updating same state 
    // if you want to do these thing then you have to pass callback function 
    // and in the callback function you have to pass some object 

    async function  DownloadPokemon(){

        //bacause jab bhi hme dubar call krna pdega tab isLoadding true hona chahiye 
        // setIsLoading(true);
        setPokemonListState((state)=>({
            ...state,
            isLoading:true}));

        // this downloads list of 20 pokemons 
        const response= await axios.get(pokemonListState.pokedexUrl);

        // we get the array of pokemons from result
        const pokemonResults=response.data.results;
        console.log(response);

        // store next and prev url 
        // for the further pokemon and previous pokemon
        // setNextUrl(response.data.next);
        // setPreUrl(response.data.previous);

        setPokemonListState((state)=>
            ({...state, 
            nextUrl:response.data.next,
            preUrl:response.data.previous
        }));

        // iterating over the array of pokemons , and using their url , 
        // to create an array of promises
        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        // axios have some property that all 
        // that takes array of promises 
        // promises ko evaluate krne m time toh lgega 
        // array of object(pokemon details)
        const pokemonData= await axios.all(pokemonResultPromise);
        // console.log(pokemonData);

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

        // console.log(res);
        // setPokemonList(res);
        // setIsLoading(false);
        setPokemonListState((state)=>(
            {...state , 
            pokemonList: res ,
            isLoading: false
        }));
    }

    // useEffect will call when pokedexUrl will change 
    useEffect(()=>{
        DownloadPokemon();
    },[pokemonListState.pokedexUrl]);
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