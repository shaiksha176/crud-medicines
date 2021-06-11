import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { User, IsAuthenticated } from "../Context/UserContext";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useContext(IsAuthenticated);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthenticated(false);
    closeMobileMenu();
    history.push("/");
  };
  return (
    <>
      <div className="nav-container">
        <div className="logo">
          MED TRACKER
          <img src="./images/icons8-google-web-search-50.png" alt="" />
        </div>

        <div className={click ? "list" : "show"}>
          {localStorage.getItem("authToken") ? (
            <>
              <Link to="/profile" onClick={closeMobileMenu}>
                PROFILE
              </Link>
              <Link to="/add" onClick={closeMobileMenu}>
                MEDICINES
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMobileMenu}>
                LOGIN
              </Link>
              <Link to="/signup" onClick={closeMobileMenu}>
                SIGNUP
              </Link>
            </>
          )}
          {authenticated && (
            <Link to="/" onClick={logout}>
              LOGOUT{" "}
            </Link>
          )}
        </div>
        <div id="menu" onClick={handleClick}>
          <MenuIcon />
        </div>
      </div>
    </>
  );
};

export default Navbar;
