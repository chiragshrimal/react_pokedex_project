import { Link } from "react-router-dom";
import "./Pokemon.css";

// this is for one specific pokemon 
function Pokemon({name,image,id}){

    return (
        <div className="pokemon">
            {/* agr m chahta hu ki url pe hit krne par page 
            refresh na ho uske liye "link" use karenge insted of a */}
            <Link className="pokemon-link" to={`/pokemon/${id}`}>
            <div className="pokemon-name">{name}</div>
            <div>
                <img className="pokemon-image" src={image} alt={name} />
            </div>
            </Link>
        </div>
    )



}

export default Pokemon;