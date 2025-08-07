export function StrategyIndex({ strategies, onShow, onAddLegs }) {
  return (
    <div>
        <h1 style={{
          textAlign: "center",
        }}>
          All Strategies ({strategies.length} total)
        </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        justifyItems: "center",
        padding: "20px"
      }}>

        {strategies.map((strategy) => (
          <div key={strategy.id} style={{
          width: "200px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "center",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff"
          }}>
            <h2>{strategy.name}</h2>
            <img
              src={strategy.image_url}
              alt={strategy.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <button onClick={() => onShow(strategy)}>More Info</button>
            <button onClick={() => onAddLegs(strategy)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}