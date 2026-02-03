export default function GuessList({ guesses = [] }) {
  return (
    <div className="guess-panel">
      <h3>AI guesses</h3>
      <ul>
        {guesses.length === 0 && <li>AI is thinking...</li>}
        {guesses.map((g, i) => (
          <li key={i}>
            Is it a <strong>{g.label}</strong>? (
            {(g.confidence * 100).toFixed(1)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
