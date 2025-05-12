// src/utils/ApiPokemon.js
export async function getRandomPokemon() {
    try {
      const id = Math.floor(Math.random() * 898 + 1);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
  
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name) // ["normal", "flying", ...]
      };
  
      return pokemon;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      return null;
    }
  }

  