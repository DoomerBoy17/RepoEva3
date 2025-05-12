export default function ClickerButton({ onClick }) {
    return (
      <button onClick={onClick} style={{ fontSize: '2rem', padding: '10px 20px' }}>
        ¡Haz clic para ganar PokéPuntos!
      </button>
    );
  }