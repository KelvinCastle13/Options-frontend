import { useEffect, useState } from "react"
import { LEG_TYPES, LEG_ACTIONS, EXPIRATIONS, STRIKE_TYPES } from "./constants.jsx";

//  const LEG_TYPES = ["Call", "Put"];
//  const LEG_ACTIONS = ["Buy", "Sell"];
//  const EXPIRATIONS = ["0D", "1W", "2W", "3W", "1M", "40D", "90D", "6M"];
//  const STRIKE_TYPES = ["IDM", "ATM", "OTM", "DELTA"]

const blankLeg = {
leg_type: "",
leg_action: "",
expiration: "",
strike_type: "",
strike_value: "",
};


export default function OptionLegShow({ strategy, onClose, onSubmit }) {
  const [legs, setLegs] = useState([]);

  useEffect(() => {
    setLegs(new Array(strategy.leg_count || 2).fill().map(() => ({ ...blankLeg })));
  }, [strategy]);

  const updateLeg = (index, field, value) => {
    const updated = [...legs];
    updated[index][field] = value;
    setLegs(updated);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(legs);
    onClose(); 
  }

  return (
    <div>
      <h1>{strategy.name}</h1>
      <form onSubmit={handleSubmit}>
        {legs.map((leg, index) => (
      <div key={index}>
        <h3>Leg {index + 1}</h3>

          <div>
            <label>Leg Type: </label>
            <select 
            value={leg.leg_type} 
            onChange={(event) => updateLeg(index, "leg_type", event.target.value)}>
              <option value="">Select</option>
                {LEG_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
            </select>
          </div> 
          
          <div>
            <label>Leg Action: </label>
            <select 
            value={leg.leg_action} 
            onChange={(event) => updateLeg(index, "leg_action", event.target.value)}>
              <option value="">Select</option>
                {LEG_ACTIONS.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
            </select>
          </div> 

          <div>
            <label>Expiration: </label>
            <select 
            value={leg.expiration} 
            onChange={(event) => updateLeg(index, "expiration", event.target.value)}>
              <option value="">Select</option>
                {EXPIRATIONS.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
            </select>
          </div> 

          <div>
            <label>Strike Type: </label>
            <select 
            value={leg.strike_type} 
            onChange={(event) => updateLeg(index, "strike_type", event.target.value)}>
              <option value="">Select</option>
                {STRIKE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
            </select>
          </div> 

          <div>
            <label>Strike Value:</label>
            <input 
            type="text"
            value={leg.strike_value} 
            onChange={(event) => updateLeg(index, "strike_value", event.target.value)}
            />
          </div>

        <hr />
      </div>
    ))}
      <button type="submit">Submit</button>
      </form>
  </div>
  )
}