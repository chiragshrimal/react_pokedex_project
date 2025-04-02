import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from "./components/Pokedex/Pokdex"
import CustomRoutes from './routes/CustomRoutes'

function App() {

  return (
    <div className='outer-pokedex'>
    {/*CustomRoutes ke upper hum wo chiz lga skte hai jo chize persistent 
    rhegi har page m like navbar */}
    <h1 id="pokedex-heading">
      <Link className='pokedex-name' to="/">Pokedex</Link>
    </h1>
    <CustomRoutes/>
    </div>
  )
}

export default App