import React, { useState, useContext } from "react";
import {
  User,
  Name,
  Dosage,
  Frequency,
  MedicineId,
} from "./../../Context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Add.css";
const Update = () => {
  const [name, setName] = useContext(Name);
  const [dosage, setDosage] = useContext(Dosage);
  const [frequency, setFrequency] = useContext(Frequency);
  const [user, setUser] = useContext(User);
  const [medID, setMedID] = useContext(MedicineId);
  const history = useHistory();
  const [id, setId] = useState(user.id);
  console.log(frequency, dosage);
  const handlesubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    const payload = {
      id: medID,
      name,
      dosage,
      frequency,
      user_id: id,
    };
    try {
      const res = await axios.put("/api/update", payload);
      console.log(res.data);

      setName("");
      setDosage("");
      setFrequency("");
      setMedID("");
      history.push("/add");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-container">
      <h2>Update your medicines</h2>
      <form onSubmit={handlesubmit}>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={dosage}
            className="input"
            placeholder="Dosage"
            onChange={(e) => setDosage(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={frequency}
            className="input"
            placeholder="Frequency"
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="input">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
