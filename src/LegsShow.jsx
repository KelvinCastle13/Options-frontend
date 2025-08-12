import { useState } from "react";
import axios from "axios";

export function LegsShow ({ stock, strategy, onClose, onSave }) {
  const legCount = strategy?.leg_count || 1;
  
  const [formData, setFormData] = useState(
    Array(legCount).fill(null).map(() => ({
    leg_type: "",
    side: "",
    expiration: "",
    strike: "",
    contracts: "",
  }))
);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/trades.json", {
        stock_name: stock.name,
        strategy_name: strategy.name,
        profit_loss: 0,
        legs: formData,
      })
      .then((response) => {
        onSave(response.data);
        onClose();
      })
  };

return (
  <div>
    <h3
      style={{
        textAlign: "center",
        marginBottom: "16px",
        fontFamily: "'Courier New', monospace",
        color: "#39ff14",
      }}
    >
      Legs for {stock?.name} {strategy ? `-${strategy.name}` : ""}
    </h3>

    <form 
      onSubmit={handleSubmit} 
      style={{ 
        maxWidth: "100%", 
        margin: "auto",
        padding: "8px",
      }}
    >
    <div style={legsGridStyle}>
      {formData.map((leg, index) => (
        <div key={index} style={legBoxStyle}>
          <h4 style={{ marginBottom: "12px" }}>Leg {index + 1}</h4>

          <div style={legRowStyle}>
            <select 
              name="leg_type" 
              value={leg.leg_type} 
              onChange={(event) => handleChange(index, event)} 
              required
              style={{ ...smallInputStyle, width: "65px" }}
            >
              <option value="">Type</option>
              <option value="Call">Call</option>
              <option value="Put">Put</option>
            </select>

            <select 
              name="side" 
              value={leg.side} 
              onChange={(event) => handleChange(index, event)}
              required
              style={{ ...smallInputStyle, width: "75px" }} 
            >
              <option value="">Side</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>

            <input
              type="date"
              name="expiration"
              value={leg.expiration}
              onChange={(event) => handleChange(index, event)}
              required
              style={{ ...smallInputStyle, width: "110px" }}
            />

            <input
              type="number"
              name="strike"
              placeholder="Strike"
              value={leg.strike}
              onChange={(event) => handleChange(index, event)}
              style={{ ...smallInputStyle, width: "80px" }}
              required
              min="0"
              step="0.01"
            />

          <input
            type="number"
            name="contracts"
            placeholder="Contracts"
            value={leg.contracts}
            onChange={(event) => handleChange(index, event)}
            style={{ ...smallInputStyle, width: "80px" }}
            required
            min="1"
          />
        </div>
      </div>
    ))}  
      </div>
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "20px",
        gap: "12px", 
      }}
    >
      <button
        type="submit"
        style={saveButtonStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#2ee52e")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#39ff14")
        }
      >
        Save
      </button>

      <button
        type="button"
        onClick={onClose}
        style={cancelButtonStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#666")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#444")
        }
      >
        Cancel
      </button>
      </div>
    </form>
  </div>
  );
}

const legsGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
  };

  const legBoxStyle = {
    flex: "1 1 45%",
    minWidth: "300px",
    border: "1px solid #39ff14",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#0d1117",
    boxShadow: "0 0 8px #39ff14aa",
    color: "#39ff14",
    fontFamily: "'Courier New', monospace",
  };

  const legRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
  };

  const smallInputStyle = {
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #39ff14",
    backgroundColor: "#161b22",
    color: "#39ff14",
    fontSize: "0.9rem",
    fontFamily: "'Courier New', monospace",
    outline: "none",
    width: "70px",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    flex: 1,
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#39ff14",
    color: "#0d1117",
    marginRight: "8px",
    transition: "background-color 0.3s ease",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#444",
    color: "#39ff14",
    transition: "background-color 0.3s ease",
  };
