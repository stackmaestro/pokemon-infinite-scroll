import './App.css'
import InfiniteScrollPokemon from './components/InfiniteScrollPokemon'

function App() {
  return (
    <div className="App">
     <InfiniteScrollPokemon limit={50}/>
    </div>
  )
}

export default App
