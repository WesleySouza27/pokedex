import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToFavorites } from '../features/pokemon/pokemonSlice'

interface Props {
  pokemon: {
    id: number
    name: string
    image: string
  }
}

export function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '30%', md: '18%' },
        minWidth: '200px',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f5f5f5',
        border: '2px solid #3b4cca',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={pokemon.image}
        alt={pokemon.name}
        sx={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#3b4cca',
            fontFamily: 'Pokemon, sans-serif',
          }}
        >
          {pokemon.name}
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={2} sx={{gap: { xs: '8px', sm: '12px', md: '16px' },
  }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            sx={{
              backgroundColor: '#ffcb05',
              color: '#3b4cca',
              fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.7rem' },
              padding: { xs: '4px 8px', sm: '6px 12px', md: '8px 16px' }, 
              '&:hover': {
                backgroundColor: '#f5b700',
              },
            }}
          >
            Ver Detalhes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(addToFavorites(pokemon))}
            sx={{
              backgroundColor: '#3b4cca',
              color: '#ffcb05',
              fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.7rem' },
              padding: { xs: '4px 8px', sm: '6px 12px', md: '8px 16px' },
              '&:hover': {
                backgroundColor: '#2a3a8c',
              },
            }}
          >
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}