import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { User, IsAuthenticated } from "./../../Context/UserContext";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useContext(IsAuthenticated);
  const [user, setUser] = useContext(User);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email) setErrorEmail("Please provide email address");
    if (!password) setErrorPassword("Please provide password");
    const payload = {
      email,
      password,
    };
    try {
      if (email && password) {
        const res = await axios.post("/api/login", payload);
        console.log(res);
        if (res.data.success) {
          console.log(res.data.result[0]);
          console.log(res.data.token);
          localStorage.setItem("authToken", res.data.token);
          setUser(res.data.result[0]);
          console.log(user);
          setAuthenticated(true);
          history.push("/add");
        } else {
          setError("User or Password do not match");
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handlesubmit}>
        <div>
          <div className="error-message">{error}</div>

          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <img src="./icons8-email-24.png" alt="" /> */}
          <div className="error-message">{errorEmail}</div>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type="password"
            value={password}
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error-message">{errorPassword}</div>
        </div>

        <div>
          <button type="submit" className="input">
            Login
          </button>
        </div>
        <div id="forgot-password">
          <Link to="/signup">I don't have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
