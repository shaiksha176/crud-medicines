import React, { useContext } from "react";
import axios from "axios";
import {
  User,
  Name,
  Dosage,
  Frequency,
  MedicineId,
} from "./../../Context/UserContext";
import { useHistory } from "react-router-dom";

const Table = ({ medicines, setMedicines }) => {
  const [name, setName] = useContext(Name);
  const [dosage, setDosage] = useContext(Dosage);
  const [frequency, setFrequency] = useContext(Frequency);
  const [user, setUser] = useContext(User);
  const [medID, setMedID] = useContext(MedicineId);
  const history = useHistory();

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/api/delete/${id}`);
      console.log(result);
      setMedicines(medicines.filter((medicine) => medicine.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (medicine, id) => {
    try {
      setMedID(id);
      setName(medicine.name);
      setDosage(medicine.dosage);
      setFrequency(medicine.frequency);
      console.log(id);
      history.push("/update");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {medicines.map((medicine) => (
        <tr key={medicine.name}>
          <td>{medicine.id}</td>
          <td>{medicine.name}</td>
          <td>{medicine.frequency}</td>
          <td>{medicine.dosage}</td>
          <td>
            <button onClick={() => handleDelete(medicine.id)}>Delete</button>{" "}
          </td>
          <td>
            <button onClick={() => handleUpdate(medicine, medicine.id)}>
              Update
            </button>{" "}
          </td>
        </tr>
      ))}
    </>
  );
};

export default Table;
