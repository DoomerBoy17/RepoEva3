import { useEffect, useState } from 'react';
import { saveToLocal, loadFromLocal } from './utils/localStorage';
import ClickerButton from './components/ClickerButton';
import Score from './components/Score';
import PokemonList from './components/PokemonList';
import { getRandomPokemon } from './utils/ApiPokemon';

export default function App() {
  const [score, setScore] = useState(() => {
    const saved = loadFromLocal('score');
    return saved !== null ? saved : 0;
  });

  const [pokemons, setPokemons] = useState(() => {
    const saved = localStorage.getItem('pokemons');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    saveToLocal('score', score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }, [pokemons]);

  const calculateBuffMultiplier = () => {
    let multiplier = 1;
    pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => {
        if (type === 'grass') multiplier += 1;
        if (type === 'fire') multiplier += 2;
        if (type === 'water') multiplier += 3;
        if (type === 'electric') multiplier += 4;
        if (type === 'psychic') multiplier += 5;
        if (type === 'bug') multiplier += 6;
        if (type === 'normal') multiplier += 1;
        if (type === 'fighting') multiplier += 2;
        if (type === 'ghost') multiplier += 3;
        if (type === 'ice') multiplier += 4;
        if (type === 'dragon') multiplier += 5;
        if (type === 'dark') multiplier += 6;
        if (type === 'fairy') multiplier += 7;
        if (type === 'rock') multiplier += 8;
        if (type === 'ground') multiplier += 9;
        if (type === 'steel') multiplier += 10;
        if (type === 'flying') multiplier += 11;
        // Añadir más tipos si lo deseas
      });
    });
    return multiplier;
  };
  
  const [nextCaptureAt, setNextCaptureAt] = useState(() => {
    const saved = loadFromLocal('nextCaptureAt');
    return saved !== null ? saved : 10; // Valor inicial
  });

  const [captureStep, setCaptureStep] = useState(() => {
    const saved = loadFromLocal('captureStep');
    return saved !== null ? saved : 10;
  });

  const handleClick = async () => {
    const bonus = calculateBuffMultiplier();
    const newScore = score + bonus;
    setScore(newScore);

    if (newScore >= nextCaptureAt) {
      const newPokemon = await getRandomPokemon();
      if (newPokemon) {
        setPokemons(prev => [...prev, newPokemon]);

        const nextStep = captureStep * 2;
        const newThreshold = nextCaptureAt + nextStep;

        setCaptureStep(nextStep);
        setNextCaptureAt(newThreshold);

        saveToLocal('nextCaptureAt', newThreshold);
        saveToLocal('captureStep', nextStep);
      }
    }
  };

  // Función para resetear los Pokémon
  const handleReset = () => {
    const confirmation = window.confirm(
      "Giovanni ha enviado al Team Rocket para quitarte todos tus Pokémon. ¿Estás seguro de que quieres resetear todo?"
    );
    
    if (confirmation) {
      setPokemons([]);  // Eliminar todos los Pokémon
      setScore(0);  // Resetear el puntaje
      setNextCaptureAt(10);  // Reiniciar el umbral para el siguiente Pokémon
      setCaptureStep(10);  // Reiniciar el paso de captura

      // Limpiar el localStorage
      localStorage.removeItem('pokemons');
      localStorage.removeItem('score');
      localStorage.removeItem('nextCaptureAt');
      localStorage.removeItem('captureStep');
    }
  };

  return (
    <div id="root">
      <h1>Pokémon Clicker</h1>
      <Score score={score} />
      <ClickerButton onClick={handleClick} />
      <PokemonList pokemons={pokemons} />
      
      {/* Barra de progreso */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${(score / nextCaptureAt) * 100}%` }}></div>
      </div>

      {/* Botón de resetear */}
      <button 
        onClick={handleReset} 
        style={{
          backgroundColor: '#FF5733',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          marginTop: '20px',
          transition: 'background-color 0.3s ease',
        }}
      >
        Resetear Todo
      </button>
    </div>
  );
}

//Hola1