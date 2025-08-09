import { useState } from "react";
import axios from "axios";

export function LegsShow ({ stock, strategy, onClose }) {
  const [formData, setFormData] = useState({
    type: "",
    side: "",
    expiration: "",
    strike: "",
    contracts: "",
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/legs.json", {
        ...formData, strategy_id: strategy?.id,
      })
      .then(() => {
        onClose();
      })
  };

  return (
  <div>
      <h3>
        New Leg for {stock?.name || "Unknown Stock"}{" "}
        {strategy ? `-${strategy.name}` : ""}
      </h3>

      <form 
        onSubmit={handleSubmit}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px", 
          textAlign: "left" 
      }}>

      <label>
        Type:
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          required
        >
          <option value="">Select type</option>
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </select>
      </label>

      <label>
        Side:
        <select 
          name="side" 
          value={formData.side} 
          onChange={handleChange} 
          required
        >
          <option value="">Select side</option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
      </label>

      <label>
        Expiration:
        <input
          type="date"
          name="expiration"
          value={formData.expiration}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Strike:
        <input
          type="number"
          name="strike"
          value={formData.strike}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Contracts:
        <input
          type="number"
          name="contracts"
          value={formData.contracts}
          onChange={handleChange}
          required
        />
      </label>

      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginTop: "10px" 
          }}>
        <button 
          type="submit" 
          style={{ 
            backgroundColor: "#4CAF50", 
            color: "white", 
            padding: "8px 12px", 
            borderRadius: "5px" 
          }}>
          Save leg
        </button>

        <button 
          type="button" 
          onClick={onClose} 
          style={{ 
            backgroundColor: "#ccc", 
            padding: "8px 12px", 
            borderRadius: "5px" 
          }}>
            Cancel
          </button>
      </div>
    </form>
  </div>
  );
}