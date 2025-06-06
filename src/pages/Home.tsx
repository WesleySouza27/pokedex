import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchPokemons } from '../features/pokemon/pokemonThunk'
import { setOffset } from '../features/pokemon/pokemonSlice'
import { PokemonCard } from '../components/PokemonCard'
import { Box, Typography, Button } from '@mui/material'
import { Pokedex } from '../components/Pokedex'

export function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { pokemons, loading, offset } = useSelector((state: RootState) => state.pokemon)

  useEffect(() => {
    dispatch(fetchPokemons(offset))
  }, [dispatch, offset])

  const handleNextPage = () => {
    dispatch(setOffset(offset + 10)) // Atualiza o offset no Redux
  }

  const handlePreviousPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - 10)) // Atualiza o offset no Redux
    }
  }

  if (loading) return <Typography>Carregando...</Typography>

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ffcb05, #3b4cca)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#ffcb05',
          fontFamily: 'Pokemon, sans-serif',
          textShadow: '2px 2px 4px #3b4cca',
        }}
      >
        Bem-vindo à Pokedex!
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        sx={{
          
          padding: { xs: '8px', sm: '16px', md: '24px' }, // Padding responsivo
          maxWidth: '1200px', // Limita a largura máxima do container
          margin: '0 auto', // Centraliza o container
        }}
      >
        {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      </Box>
      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={offset === 0}
          sx={{
            backgroundColor: '#3b4cca',
            color: '#ffcb05',
            '&:hover': {
              backgroundColor: '#2a3a8c',
            },
          }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          sx={{
            backgroundColor: '#3b4cca',
            color: '#ffcb05',
            '&:hover': {
              backgroundColor: '#2a3a8c',
            },
          }}
        >
          Próxima
        </Button>
      </Box>
      <Pokedex />
    </Box>
  )
}