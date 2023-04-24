import React from 'react'
import ga from '../../utils/ga'
import "./styles.css"

const PokemonItem = ({ pokemon }: any) => (
  <div className="pokemonItem">
    <img
      className="pokemon__sprite"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
      alt={pokemon.name}
      onClick={() => {
        ga.event({
          category: 'pokemon',
          action: 'click',
          label: pokemon.id,
        });
      }}
    />
    <p className="pokemonName">{pokemon.name}</p>
  </div>
)

export default PokemonItem
