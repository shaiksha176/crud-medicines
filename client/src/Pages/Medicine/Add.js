import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Add.css";
import {
  User,
  Name,
  Dosage,
  Frequency,
  MedicineId,
} from "./../../Context/UserContext";
import { useHistory } from "react-router-dom";
import Table from "./Table";
const Add = () => {
  const [name, setName] = useContext(Name);
  const [dosage, setDosage] = useContext(Dosage);
  const [frequency, setFrequency] = useContext(Frequency);
  const [user, setUser] = useContext(User);
  const [medID, setMedID] = useContext(MedicineId);
  const history = useHistory();
  const [id, setId] = useState(user.id);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/get/${id}`);
        console.log(result.data);
        setMedicines(result.data);
        console.log(medicines);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      dosage: dosage.toString(),
      frequency: frequency.toString(),
      id,
    };
    try {
      const res = await axios.post("/api/add", payload);
      console.log(res.data);
      setMedicines([
        ...medicines,
        { name, dosage, frequency, id: res.data.insertId },
      ]);
      setName("");
      setDosage("");
      setFrequency("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-container">
        <h2>Add your medicines</h2>
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
              type="number"
              value={frequency}
              className="input"
              placeholder="Frequency"
              onChange={(e) => setFrequency(e.target.value)}
              min="1"
              max="10"
            />
          </div>
          <div>
            <input
              type="number"
              value={dosage}
              className="input"
              placeholder="Dosage"
              onChange={(e) => setDosage(e.target.value)}
              min="1"
              max="10"
            />
          </div>

          <div>
            <button type="submit" className="input">
              ADD
            </button>
          </div>
        </form>
      </div>
      <table id="coins">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine Name</th>
            <th>Frequency</th>
            <th>Dosage</th>
          </tr>
        </thead>

        <tbody>
          <Table medicines={medicines} setMedicines={setMedicines} />
        </tbody>
      </table>
    </>
  );
};

export default Add;
