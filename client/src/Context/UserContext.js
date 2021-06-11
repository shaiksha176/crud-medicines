import React, { useState, createContext } from "react";

export const User = createContext();
export const IsAuthenticated = createContext();
export const MedicineId = createContext();
export const Name = createContext();
export const Dosage = createContext();
export const Frequency = createContext();

const UserDetails = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [medID, setMedID] = useState("");
  return (
    <User.Provider value={[user, setUser]}>
      <IsAuthenticated.Provider value={[authenticated, setAuthenticated]}>
        <Name.Provider value={[name, setName]}>
          <Dosage.Provider value={[dosage, setDosage]}>
            <Frequency.Provider value={[frequency, setFrequency]}>
              <MedicineId.Provider value={[medID, setMedID]}>
                {children}
              </MedicineId.Provider>
            </Frequency.Provider>
          </Dosage.Provider>
        </Name.Provider>
      </IsAuthenticated.Provider>
    </User.Provider>
  );
};

export default UserDetails;
