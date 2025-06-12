import "./NewsCard.css";
import { useState } from "react";

const NewsCard = ({
  isSavedNews,
  article,
  loggedIn,
  openPopup,
  handleSaveArticle,
  savedArticle,
  handleConfirmPopup,
  keyword,
}) => {
  // cards accept news data

  const [clicked, setClicked] = useState(false);
  const [visible, setVisibile] = useState(false);

  const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleClick = () => {
    setClicked(true);
  };

  const handleHover = () => {
    setVisibile(true);
  };

  const handleHoverOut = () => {
    setVisibile(false);
  };

  return (
    <>
      {isSavedNews ? (
        <>
          <div className="card">
            <button
              className="card__trashcan"
              type="button"
              onClick={() => handleConfirmPopup(savedArticle)}
            />
            <div className="card__keyword-container">
              <p className="card__keyword">{savedArticle.keyword}</p>
            </div>
            <article className="card__content">
              {savedArticle.urlToImage && (
                <img
                  className="card__image"
                  src={savedArticle.urlToImage}
                  alt={savedArticle.title}
                />
              )}
              <div className="card__text-container">
                <p className="card__date">{savedArticle.date}</p>
                <h3 className="card__title title_clamp">
                  <a
                    href={savedArticle.url}
                    rel="noopener noreferer"
                    target="_blank"
                  >
                    {savedArticle.title}
                  </a>
                </h3>
                <p className="card__text text_clamp">
                  {savedArticle.description}
                </p>
                <p className="card__author">{savedArticle.author}</p>
              </div>
            </article>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            {loggedIn === true ? (
              <button
                onClick={(e) => {
                  handleSaveArticle({ article }, keyword);
                  e.currentTarget.disabled = true;
                  handleClick();
                }}
                type="radio"
                className={`${
                  clicked ? "card__bookmark-active" : "card__bookmark"
                }`}
              />
            ) : (
              <>
                <button
                  disabled
                  className="card__bookmark-disabled"
                  onMouseOver={handleHover}
                />
                <button
                  onClick={openPopup}
                  onMouseOut={handleHoverOut}
                  type="text"
                  className={`card__signin ${
                    visible === true ? "signin_reveal" : ""
                  }`}
                >
                  Sign in to save articles
                </button>
              </>
            )}
            <article className="card__content">
              {article.urlToImage && (
                <img
                  className="card__image"
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <div className="card__text-container">
                <p className="card__date">{convertDate(article.publishedAt)}</p>
                <h3 className="card__title title_clamp">
                  <a
                    href={article.url}
                    rel="noopener noreferer"
                    target="_blank"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="card__text text_clamp">{article.description}</p>
                <p className="card__author">{article.source.name}</p>
              </div>
            </article>
          </div>
        </>
      )}
    </>
  );
};

export default NewsCard;
