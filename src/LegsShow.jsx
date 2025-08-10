import { useState } from "react";
import axios from "axios";

export function LegsShow ({ stock, strategy, onClose }) {
  const legCount = strategy?.leg_count || 1;
  
  const [formData, setFormData] = useState(
    Array(legCount).fill(null).map(() => ({
    type: "",
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
      .post("/legs.json", {
        strategy_id: strategy.id,
        legs: formData,
      })
      .then(() => {
        onClose();
      })
  };

  const legsGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
  };

  const legBoxStyle = {
    flex: "1 1 45%",
    minWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    background: "#f9f9f9",
  };

  const legRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "8px",
  flexWrap: "wrap",
};

const smallInputStyle = {
  padding: "4px 6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "0.8rem",
  width: "70px",
};

return (
  <div>
    <h3 
      style={{ 
        textAlign: "center", 
        marginBottom: "12px",  
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
      <div style={legsGridStyle}></div>
        {formData.map((leg, index) => (
          <div key={index} style={legBoxStyle}>
            <h4 style={{ 
              marginBottom: "8px", 
              }}
            >
              Leg {index + 1}
            </h4>

          <div style={legRowStyle}>
            <select 
              name="type" 
              value={leg.type} 
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
              style={{ ...smallInputStyle, width: "65px" }} 
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
              style={{ ...smallInputStyle, width: "65px" }}
            />

            <input
              type="number"
              name="strike"
              placeholder="Strike"
              value={leg.strike}
              onChange={(event) => handleChange(index, event)}
              style={{ ...smallInputStyle, width: "70px" }}
              required
            />

          <input
            type="number"
            name="contracts"
            placeholder="Contracts"
            value={leg.contracts}
            onChange={(event) => handleChange(index, event)}
            style={{ ...smallInputStyle, width: "70px" }}
            required
          />
        </div>
      </div>
    ))}  

    <div 
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "12px",
        gap: "8px", 
      }}
    >
      <button 
        type="submit" 
        style={{ 
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          flex: 1, 
        }}
      >
        Save
      </button>

      <button 
        type="button" 
        onClick={onClose} 
        style={{ 
          backgroundColor: "#ccc",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          flex: 1,
        }}
      >
        Cancel
        </button>
      </div>
    </form>
  </div>
  );
}
