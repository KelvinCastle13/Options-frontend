export function StrategyIndex({ strategies }) {
  return (
    <div>
      <h1>All Strategies ({strategies.length} total)</h1>
      {strategies.map((strategy) => (
        <div key={strategy.id}>
          <h2>{strategy.name}</h2>
          <p>{strategy.description}</p> 
        </div>
      ))}
    </div>
  );
}