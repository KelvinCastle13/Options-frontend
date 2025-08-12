import axios from "axios";

export function TradePage({ trades, setTrades}) {
  function handleDeleteTrade(tradeId) {
    axios.delete(`/trades/${tradeId}`)
      .then(() => {
        setTrades(trades.filter(trade => trade.id !== tradeId));
      })
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "24px" }}>Trade Log</h2>
      {trades.length === 0 && <p>No trades saved yet.</p>}

      {trades.map(trade => (
        <div key={trade.id} style={tradeCardStyle}>
          <div style={headerFlexStyle}>
            <h3>Trade #{trade.id}</h3>
            <button
              onClick={() => handleDeleteTrade(trade.id)}
              style={deleteButtonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = deleteButtonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = deleteButtonStyle.backgroundColor)
              }
            >
              Delete Trade
            </button>
          </div>

          <div style={{ marginTop: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>Side</th>
                  <th style={tableHeaderStyle}>Expiration</th>
                  <th style={tableHeaderStyle}>Strike</th>
                  <th style={tableHeaderStyle}>Contracts</th>
                </tr>
              </thead>
              <tbody>
                {trade.legs.map((leg, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{leg.leg_type}</td>
                    <td style={tableCellStyle}>{leg.side}</td>
                    <td style={tableCellStyle}>{leg.expiration}</td>
                    <td style={tableCellStyle}>{leg.strike}</td>
                    <td style={tableCellStyle}>{leg.contracts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={profitLossStyle}>Profit/Loss: $0.00</div>
        </div>
      ))}
    </div>
  )
}

const tableHeaderStyle = {
  borderBottom: "2px solid #39ff14",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#0d1117",
  color: "#39ff14",
};

const tableCellStyle = {
  padding: "8px",
  color: "#c6f2a2",
  borderBottom: "1px solid #222",
  fontVariantNumeric: "tabular-nums",
};

const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  backgroundColor: "#161b22",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 0 20px #39ff14aa",
  fontFamily: "'Courier New', monospace",
  color: "#39ff14",
};

const tradeCardStyle = {
  border: "1px solid #39ff14",
  borderRadius: "8px",
  marginBottom: "20px",
  padding: "16px",
  backgroundColor: "#0d1117",
};

const headerFlexStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const deleteButtonStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "6px 12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "'Courier New', monospace",
  transition: "background-color 0.3s ease",
};

const deleteButtonHoverStyle = {
  backgroundColor: "#c0392b",
};

const profitLossStyle = {
  marginTop: "12px",
  fontWeight: "bold",
  color: "#39ff14",
  fontSize: "1.1rem",
};
