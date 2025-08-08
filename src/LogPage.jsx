import { useEffect, useState } from "react";
import axios from "axios";
import "./LogPage.css";
import { LEG_TYPES, LEG_ACTIONS, EXPIRATIONS, STRIKE_TYPES } from "./constants.jsx";

const LogPage = () => {
  // const [optionLegs, setOptionLegs] = useState([]);
  const [editingLeg, setEditingLeg] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [groupedLegs, setGroupedLegs] = useState({});

  useEffect(() => {
    fetchLegs();
  }, []);

  const fetchLegs = async () => {
    try {
      const response = await axios.get("/option_legs.json");
      setGroupedLegs(response.data);
    } catch (error) {
      console.error("Error fetching legs:", error);
    }
  };

  const handleEditClick = (leg) => {
    setEditingLeg(leg.id);
    setFormValues({ ...leg });
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/option_legs/${id}`, formValues);
      setEditingLeg(null);
      fetchLegs();
    } catch (error) {
      console.error("Error updating leg:", error);
    }
  };

  const handleCancel = () => {
    setEditingLeg(null);
    setFormValues({});
  };


 return (
    <div>
      <h2>Option Legs Log</h2>
      {Object.entries(groupedLegs).map(([timestamp, legs]) => (
        <div key={timestamp}>
          <h3>{timestamp}</h3>
          <table>
            <thead>
              <tr>
                <th>Leg Type</th>
                <th>Leg Action</th>
                <th>Expiration</th>
                <th>Strike Type</th>
                <th>Strike Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {legs.map((leg) => (
                <tr key={leg.id}>
                  {editingLeg === leg.id ? (
                    <>
                      <td>
                        <select
                          name="leg_type"
                          value={formValues.leg_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Leg Type</option>
                          {LEG_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="leg_action"
                          value={formValues.leg_action}
                          onChange={handleChange}
                        >
                          <option value="">Select Leg Action</option>
                          {LEG_ACTIONS.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="expiration"
                          value={formValues.expiration}
                          onChange={handleChange}
                        >
                          <option value="">Select Expiration</option>
                          {EXPIRATIONS.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="strike_type"
                          value={formValues.strike_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Strike Type</option>
                          {STRIKE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          name="strike_value"
                          value={formValues.strike_value}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleSave(leg.id)}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{leg.leg_type}</td>
                      <td>{leg.leg_action}</td>
                      <td>{leg.expiration}</td>
                      <td>{leg.strike_type}</td>
                      <td>{leg.strike_value}</td>
                      <td>
                        <button onClick={() => handleEditClick(leg)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default LogPage;
