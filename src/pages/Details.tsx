import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Typography, Card, CardMedia, CardContent, Box, List, ListItem } from '@mui/material'

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
  sprites: { front_default: string }
  abilities: Ability[]
  stats: Stat[]
}

export function Details() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => {
      setPokemon(res.data)
    })
  }, [name])

  if (!pokemon) return <Typography>Carregando detalhes...</Typography>

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: 'linear-gradient(135deg, #ffcb05, #3b4cca)', // Fundo temático
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          maxWidth: '500px',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#f5f5f5',
          border: '2px solid #3b4cca',
        }}
      >
        <CardMedia
          component="img"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffcb05' }}>
            {pokemon.name.toUpperCase()}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '8px' }}>
            ID: {pokemon.id}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '8px' }}>
            Altura: {pokemon.height}m
          </Typography>
          <Typography variant="h6" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
            Habilidades
          </Typography>
          <List>
            {pokemon.abilities.map((a, i) => (
              <ListItem key={i} sx={{ justifyContent: 'center', padding: '4px 0' }}>
                {a.ability.name}
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
            Status
          </Typography>
          <List>
            {pokemon.stats.map((s, i) => (
              <ListItem key={i} sx={{ justifyContent: 'center', padding: '4px 0' }}>
                {s.stat.name}: {s.base_stat}
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              marginTop: '16px',
              backgroundColor: '#3b4cca',
              color: '#ffcb05',
              '&:hover': {
                backgroundColor: '#2a3a8c',
              },
            }}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}