import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logout_dark from "../../images/logout_dark.svg";
import { UserContext } from "../../contexts/UserContext";

const NavigationSaved = ({ handleLogout, handleEditPopup }) => {
  const currentUser = useContext(UserContext);
  return (
    <>
      <nav
        className="nav__content"
        style={{ borderBottom: "0.5px solid", borderColor: "#1a1b22" }}
      >
        <h2 className="nav__title" style={{ color: "#1a1b22" }}>
          NewsExplorer
        </h2>
        <div className="nav__buttons" style={{ gap: "15px" }}>
          <button type="text" className="nav__button">
            <Link to="/" style={{ textDecoration: "none", color: "#1a1b22" }}>
              Home
            </Link>
          </button>
          <hr className="nav__outline-black" />
          <button
            type="text"
            className="nav__button-saved"
            style={{ color: "#1a1b22" }}
          >
            Saved Articles
          </button>
          <button
            className="nav__button"
            style={{ textDecoration: "none", color: "#1a1b22", width: "100px" }}
            type="text"
            onClick={handleEditPopup}
          >
            Edit Profile
          </button>
          <Link to="/" style={{ textDecoration: "none", color: "#1a1b22" }}>
            <button
              type="text"
              className="nav__button-logout dark"
              onClick={handleLogout}
            >
              {currentUser?.username}
              <img src={logout_dark} className="nav__button-logout-icon" />
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavigationSaved;
