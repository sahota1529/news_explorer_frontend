import "./Header.css";
import header_background from "../../images/header_background.png";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

const Header = ({
  openPopup,
  handleSubmit,
  loggedIn,
  handleLogout,
  handleEditPopup,
  setSearching,
  setIsLoading,
  setArticles,
}) => {
  return (
    <header className="header">
      <img
        src={header_background}
        className="header__background-image"
        alt="Background Image"
      />
      <Navigation
        openPopup={openPopup}
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        handleEditPopup={handleEditPopup}
      />
      <SearchForm
        handleSubmit={handleSubmit}
        setSearching={setSearching}
        setIsLoading={setIsLoading}
        setArticles={setArticles}
      />
    </header>
  );
};

export default Header;
