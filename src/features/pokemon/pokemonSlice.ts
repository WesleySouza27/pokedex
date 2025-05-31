// src/features/pokemon/pokemonSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { fetchPokemons } from './pokemonThunk'

interface Ability {
  ability: { name: string }
}

interface Stat {
  stat: { name: string }
  base_stat: number
}

interface Pokemon {
  id: number
  name: string
  height: number
  image: string
  abilities: Ability[]
  stats: Stat[]
}

interface PokemonState {
  pokemons: Pokemon[]
  favorites: Pokemon[]
  loading: boolean
  error: string | null
  offset: 0
}

const initialState: PokemonState = {
  pokemons: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'), // Restaurar favoritos do localStorage
  loading: false,
  error: null,
  offset: 0,
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const alreadyExists = state.favorites.some(p => p.id === action.payload.id)
      if (!alreadyExists) {
        state.favorites.push(action.payload)
         localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(p => p.id !== action.payload.id)
      localStorage.setItem('favorites', JSON.stringify(state.favorites)) // Atualizar no localStorage
    },
    setOffset(state, action) {
      state.offset = action.payload // Atualiza o offset no estado global
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.loading = true
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false
        state.pokemons = action.payload
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao buscar pokémons'
      })
  },
})

export const { addToFavorites, removeFromFavorites, setOffset } = pokemonSlice.actions
export default pokemonSlice.reducer