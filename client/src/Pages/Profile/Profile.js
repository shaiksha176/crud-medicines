import React, { useContext } from "react";
import "./Profile.css";
import { User } from "./../../Context/UserContext";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useContext(User);
  const history = useHistory();
  console.log(user);
  const handlechange = () => {
    history.push("/update/profile");
  };
  return (
    <div className="profile-container">
      <h2>Account Details</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.password}</p>
      <button onClick={handlechange}>Update Profile</button>
    </div>
  );
};

export default Profile;
