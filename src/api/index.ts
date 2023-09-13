export const POKEMON_URI = 'https://pokeapi.co/api/v2/pokemon'

export const fetchPokemon = async (offset? : number, limit? : number) : Promise<PokemonPaginatedResponse>=>{
  const pokemonEndpoint = (offset && offset >= 0 ) || limit ? `${POKEMON_URI}?offset=${offset}&limit=${limit}` : POKEMON_URI
  return fetch(pokemonEndpoint)
  .then(response => response.json()).then(json => json);
}