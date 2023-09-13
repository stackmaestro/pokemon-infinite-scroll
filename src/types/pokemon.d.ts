interface Pokemon {
  name: string
  url: string
}

interface PokemonPaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}