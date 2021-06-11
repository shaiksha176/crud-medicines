import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    if (!email) setErrorEmail("Please provide email address");
    if (!password) setErrorPassword("Please provide password");
    if (password.length < 6)
      setErrorPassword("Password must be atleast 5 characters");
    if (!name) setErrorName("Please provide name");
    if (password !== confirmPassword)
      setErrorPassword("Two passwords do not match");
    e.preventDefault();
    if (name && email && password && password === confirmPassword) {
      const payload = {
        name,
        email,
        password,
      };
      console.log(payload);

      try {
        const response = await axios.post("/api/register", payload);
        console.log(response.data);
        if (response.data === "registration successfull") {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name=""
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* <img src="./icons8-account-24.png" alt="" /> */}

          <div className="error-message">{errorName}</div>
        </div>
        <div>
          <input
            type="email"
            name=""
            id=""
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <img src="./icons8-email-24.png" alt="" />
          <div className="error-message">{errorEmail}</div>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type="password"
            name=""
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error-message">{errorPassword}</div>
        </div>
        <div>
          <input
            type="password"
            name=""
            className="input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="error-message">{errorPassword}</div>
        </div>

        <div>
          <button type="submit" className="input">
            Create Account
          </button>
        </div>
        <div id="forgot-password">
          <Link to="/">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
