import React from 'react';

export default function PokemonList({ pokemons }) {
  // Imagen de fallback en caso de error
  const fallbackImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  // Función para manejar los errores de carga de la imagen
  const handleImageError = (e) => {
    e.target.src = fallbackImage; // Cambia la imagen a la Pokébola
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Pokémon obtenidos:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemons.map((pokemon, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            {/* Imagen del Pokémon, si falla se carga la Pokébola */}
            <img
              src={pokemon.image}
              alt={pokemon.name}
              onError={handleImageError} // Añade el manejador de errores
              style={{ width: '100px', height: '100px' }} // Tamaño de la imagen
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
