//  Wraps multiple route definitions.
// It enables client-side routing, meaning pages are loaded without refreshing the browser.
// ye tabhi work krega jab browserRouter enabled hoga 
import { Routes , Route} from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokdex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";
function CustomRoutes(){

    return (
        // jab bhi hum koi route bnate hai react m 
        // tab Routes m bind krte hai 
        <Routes>
            {/* konse path pe konsa components render krna hai */}
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>} />
        </Routes>
    );
}

export default CustomRoutes;