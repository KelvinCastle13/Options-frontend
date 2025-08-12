export function StrategyIndex({ strategies, onShow }) {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>
        All Strategies ({strategies.length} total)
      </h1>

      <div style={gridStyle}>
        {strategies.map((strategy) => (
          <div key={strategy.id} style={cardStyle}>
            <h2 style={{ marginBottom: "10px" }}>{strategy.name}</h2>
            <img
              src={strategy.image_url}
              alt={strategy.name}
              style={imgStyle}
            />
            <button
              onClick={() => onShow(strategy)}
              style={buttonStyle}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#39ff14")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0d1117")}
            >
              More Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "'Courier New', monospace",
    color: "#39ff14",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: "bold",
    fontSize: "1.8rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    justifyItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "200px",
    border: "1px solid #39ff14",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 0 10px #39ff14aa",
    backgroundColor: "#161b22",
    color: "#39ff14",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "12px",
  };

  const buttonStyle = {
    marginTop: "auto",
    backgroundColor: "#0d1117",
    border: "1px solid #39ff14",
    borderRadius: "8px",
    color: "#39ff14",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "'Courier New', monospace",
    transition: "background-color 0.3s ease",
  };