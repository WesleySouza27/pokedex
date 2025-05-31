// src/features/pokemon/pokemonThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Pokemon {
  id: number
  name: string
  height: number
  image: string
  abilities: { ability: { name: string } }[]
  stats: { stat: { name: string }; base_stat: number }[]
}

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchAll',
  async (offset: number = 0): Promise<Pokemon[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pokemon`, {
      params: { offset, limit: 10 },
    })
    const results = await Promise.all(
      response.data.results.map(async (pokemon: { url: string }) => {
        const res = await axios.get(pokemon.url)
        return {
          id: res.data.id,
          name: res.data.name,
          height: res.data.height,
          image: res.data.sprites.front_default,
          abilities: res.data.abilities,
          stats: res.data.stats,
        }
      })
    )
    return results
  }
)
