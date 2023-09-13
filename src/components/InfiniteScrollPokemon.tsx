import { useEffect, useState, UIEvent} from 'react'
import { fetchPokemon } from '../api';

interface Props {
  limit: number
}

function InfiniteScrollPokemon({limit : propLimit}: Props) {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState<number>(propLimit >= 10 ? propLimit : 10)
  const [offset, setOffset] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const handleScroll = async (e : UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement
    if(!loading){
      const bottom = element.scrollHeight - element.scrollTop === element.clientHeight;
      if (bottom && pokemons.length < count) {
        try{
          setLoading(true)
          const pokemonResponse = await fetchPokemon(offset, limit)
          const {results, ...rest} = pokemonResponse
          setPokemons((prev)=> [...prev, ...results])
          setOffset((prev) => prev + limit)
        }catch(error){
          console.error(error)
        }finally{
          setLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () =>{
      try{
        setLoading(true)
        const pokemonResponse = await fetchPokemon(offset, limit >= 20 ? limit : 20)
        const {results, ...rest} = pokemonResponse
        setPokemons(results)
        setOffset(results.length)
        setCount(rest.count)
      }catch(error){
        console.error(error)
      }finally{
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="list" onScroll={handleScroll}>
    <ul >
      {pokemons.map((pokemon,index) => (
        <li key={index}>{pokemon.name}</li>
      ))}
      {loading ? <div>Loading ...</div> : null}
    </ul>
  </div>
  )
}

export default InfiniteScrollPokemon