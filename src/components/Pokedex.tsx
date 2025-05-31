import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material'

export function Pokedex() {
  const favorites = useSelector((state: RootState) => state.pokemon.favorites) || [] // Garante que seja um array

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#ffcb05',
          fontFamily: 'Pokemon, sans-serif',
          textShadow: '2px 2px 4px #3b4cca',
        }}
      >
        Sua Pokedex
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {favorites.map(poke => (
          <Card
            key={poke.id}
            sx={{
              width: '300px',
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
              image={poke.image}
              alt={poke.name}
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderBottom: '2px solid #3b4cca',
              }}
            />
            <CardContent
              sx={{
                textAlign: 'center',
                color: '#3b4cca',
                fontFamily: 'Pokemon, sans-serif',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {poke.name.toUpperCase()}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '8px' }}>
                ID: {poke.id}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '8px' }}>
                Altura: {poke.height}m
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '8px' }}>
                Habilidades:{' '}
                {Array.isArray(poke.abilities)
                  ? poke.abilities.map(a => a.ability.name).join(', ')
                  : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  )
}