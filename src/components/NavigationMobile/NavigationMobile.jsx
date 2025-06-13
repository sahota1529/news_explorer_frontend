import "./NavigationMobile.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logout_light from "../../images/logout_light.svg";
import { UserContext } from "../../contexts/UserContext";

const NavigationMobile = ({
  route,
  loggedIn,
  openPopup,
  isSavedNews,
  handleLogout,
  handleEditPopup,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const currentUser = useContext(UserContext);

  function handleDropdown() {
    setDropdown(true);
  }

  function closeDropdown() {
    setDropdown(false);
  }

  return (
    <nav className="nav__mobile">
      {/* Mobile menu */}
      {loggedIn ? (
        <>
          <h2 className={`nav__mobile-title ${isSavedNews ? "nav_saved" : ""}`}>
            NewsExplorer
          </h2>
          <button
            onClick={handleDropdown}
            type="button"
            className={`${
              isSavedNews ? "nav__mobile-button-dark" : "nav__mobile-button"
            }`}
          />
          {/* Drop down menu */}
          <div
            style={{ height: "325px" }}
            className={`nav__dropdown ${
              dropdown ? "nav__dropdown-opened" : ""
            }`}
          >
            <div className="nav__dropdown-top">
              <h2 className="nav__mobile-title">NewsExplorer</h2>
              <button
                type="button"
                className="nav__dropdown-close-button"
                onClick={closeDropdown}
              />
            </div>
            <div className="nav__mobile-buttons">
              <button type="text" className="nav__mobile-menu-button">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </button>
              <button className="nav__mobile-menu-button" type="text">
                <Link
                  to="/saved-news"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Saved Articles
                </Link>
              </button>
              <button
                className="nav__button"
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100px",
                  textAlign: "left",
                }}
                type="text"
                onClick={handleEditPopup}
              >
                Edit Profile
              </button>
              <button
                type="text"
                className="nav__mobile-button__logout"
                onClick={() => {
                  handleLogout();
                  closeDropdown();
                }}
              >
                {currentUser?.username}
                <img
                  src={logout_light}
                  className="nav__mobile-button__logout-icon"
                />
              </button>
            </div>
          </div>
        </>
      ) : (
        // Mobile menu for logged in user/saved news route
        <>
          <h2
            className={`nav__mobile-title ${
              route.pathname === "/saved-news" ? "nav_saved" : ""
            }`}
          >
            NewsExplorer
          </h2>
          <button
            onClick={handleDropdown}
            type="button"
            className={`${
              isSavedNews ? "nav__mobile-button-dark" : "nav__mobile-button"
            }`}
          />
          <div
            className={`nav__dropdown ${
              dropdown ? "nav__dropdown-opened" : ""
            }`}
          >
            <div className="nav__dropdown-top">
              <h2 className="nav__mobile-title">NewsExplorer</h2>
              <button
                type="button"
                className="nav__dropdown-close-button"
                onClick={closeDropdown}
              />
            </div>
            <div className="nav__mobile-buttons">
              <button type="text" className="nav__mobile-menu-button">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </button>
              {route.pathname === "/saved-news" ? (
                <>
                  <button
                    type="text"
                    className="nav__mobile-button__logout"
                    style={{ color: "#1a1b22" }}
                    onClick={handleLogout}
                  >
                    {currentUser?.username}
                    <img
                      src={logout_light}
                      className="nav__mobile-button__logout-icon"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="text"
                    className="nav__mobile-button-register"
                    onClick={openPopup}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavigationMobile;
