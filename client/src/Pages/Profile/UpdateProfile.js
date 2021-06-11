import React, { useState, useContext } from "react";
import "./UpdateProfile.css";
import { User } from "./../../Context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
  const history = useHistory();
  const [user, setUser] = useContext(User);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: user.id,
      name,
      email,
      password,
    };
    try {
      const res = await axios.put("/api/update/profile", payload);
      console.log(res.data);
      setUser({ id: user.id, name, email, password });
      setName("");
      setEmail("");
      setPassword("");

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="update-container">
      <h2>Update your Profile</h2>
      <form onSubmit={handlesubmit}>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={email}
            className="input"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={password}
            className="input"
            placeholder="Frequency"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="input">
            UPDATE
          </button>
        </div>
      </form>
      <button onClick={() => history.push("/profile")}>GO BACK</button>
    </div>
  );
};

export default UpdateProfile;
