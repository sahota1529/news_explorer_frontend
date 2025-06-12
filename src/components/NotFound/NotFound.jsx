import "./NotFound.css";
import not_found from "../../images/not_found.svg";

const NotFound = () => {
  return (
    <>
      <div className="notfound__container">
        <img src={not_found} className="notfound__img" alt="Not Found Icon" />
        <div className="notfound__text-container">
          <h2 className="notfound__header">Nothing Found</h2>
          <p className="notfound__text">
            Sorry, but nothing matched your search terms
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
