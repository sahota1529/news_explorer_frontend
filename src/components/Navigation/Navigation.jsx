import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import logout_light from "../../images/logout_light.svg";

import { UserContext } from "../../contexts/UserContext";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import NavigationSaved from "../NavigationSaved/NavigationSaved";

const Navigation = ({
  loggedIn,
  openPopup,
  isSavedNews,
  handleLogout,
  handleEditPopup,
}) => {
  const route = useLocation();

  const currentUser = useContext(UserContext);

  return (
    <>
      <section className="nav">
        {route.pathname === "/" ? (
          // HOMEPAGE NAV BAR (LIGHT MODE)
          <nav
            className="nav__content"
            style={{ borderBottom: "0.5px solid", borderColor: "white" }}
          >
            <h2 className="nav__title">NewsExplorer</h2>
            {/* Logged In Nav Bar */}
            {loggedIn ? (
              <>
                <div className="nav__buttons" style={{ gap: "15px" }}>
                  <button type="text" className="nav__button">
                    Home
                  </button>
                  <hr className="nav__outline" />
                  <button type="text" className="nav__button-saved">
                    <Link
                      to="/saved-news"
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      Saved Articles
                    </Link>
                  </button>
                  <button
                    type="text"
                    className="nav__button-logout"
                    onClick={handleLogout}
                  >
                    {currentUser?.username}
                    <img
                      src={logout_light}
                      className="nav__button-logout-icon"
                      alt="Logout Icon"
                    />
                  </button>
                </div>
              </>
            ) : (
              // Logged Out Nav Bar
              <>
                <div className="nav__buttons">
                  <button type="text" className="nav__button">
                    Home
                  </button>
                  <hr className="nav__outline" />
                  <button className="nav__button-register" onClick={openPopup}>
                    Sign In
                  </button>
                </div>
              </>
            )}
          </nav>
        ) : (
          // SAVED NEWS NAV BAR (DARK MODE)
          <NavigationSaved
            handleLogout={handleLogout}
            handleEditPopup={handleEditPopup}
          />
        )}
        {/* Nav Bar Mobile Mode */}
        <div className="nav__mobile-toggle">
          <NavigationMobile
            openPopup={openPopup}
            isSavedNews={isSavedNews}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            route={route}
            handleEditPopup={handleEditPopup}
          />
        </div>
      </section>
    </>
  );
};

export default Navigation;
