import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";
import NewsCardList from "../NewsCardList/NewsCardList";
import { UserContext } from "../../contexts/UserContext";
import { SavedArticleContext } from "../../contexts/SavedArticleContext";
import { useContext, useEffect } from "react";
import { getArticles } from "../../utils/article-api";
const SavedNews = ({
  loggedIn,
  isSavedNews,
  openPopup,
  handleLogout,
  handleEditPopup,
  handleUnsaveArticle,
  handleConfirmPopup,
  keyword,
}) => {
  const currentUser = useContext(UserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedArticleContext);

  // Filtering only cards to count for the current user
  const userArticleFilter = savedArticles.filter(
    (article) => article.owner === currentUser._id
  );
  //keyword array
  const keywordArray = userArticleFilter.map((article) => article.keyword);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getKeywordString = (keywords) => {
    if (keywordArray.length === 0) {
      return "";
    }
    if (keywordArray.length === 1) {
      return `${capitalizeFirstLetter(keywordArray[0])}`;
    }
    if (keywordArray.length > 1) {
      const count = {};
      for (let keyword of keywords) {
        if (count[keyword]) {
          count[keyword]++;
        } else {
          count[keyword] = 1;
        }
      }

      //sort the array, style
      const sortedKeywordArray = [];
      for (const item in count) {
        sortedKeywordArray.push([item, count[item]]);
      }
      sortedKeywordArray.sort((a, b) => {
        return b[1] - a[1];
      });

      if (sortedKeywordArray.length === 1) {
        return `${capitalizeFirstLetter(sortedKeywordArray[0][0])}`;
      } else if (sortedKeywordArray.length === 2) {
        return `${capitalizeFirstLetter(
          sortedKeywordArray[0][0]
        )} and ${capitalizeFirstLetter(sortedKeywordArray[1][0])}`;
      } else {
        const firstKeywords = sortedKeywordArray
          .slice(0, 2)
          .map((keyword) => capitalizeFirstLetter(keyword[0]))
          .join(", ");
        const moreCount = sortedKeywordArray.length - 2;
        return `${firstKeywords}, and ${moreCount} more`;
      }
    } else {
      return null;
    }
  };

  const keywordString = getKeywordString(keywordArray);

  // TEMPORARY SAVED CARDS JUST SEARCHING FOR TOP HEADLINES NO BACKEND YET
  useEffect(() => {
    console.log(keyword);
    if (isSavedNews) {
      getArticles()
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => console.log(err));
    }
  }, [isSavedNews]);

  return (
    <section className="saved">
      <header className="saved__header">
        <Navigation
          loggedIn={loggedIn}
          isSavedNews={isSavedNews}
          openPopup={openPopup}
          handleLogout={handleLogout}
          handleEditPopup={handleEditPopup}
        />
        <div className="saved__text-container">
          <p className="saved__text-subtitle">Saved Articles</p>
          <h1 className="saved__text-title">{`${currentUser?.username}, you have ${userArticleFilter.length} saved articles`}</h1>
          <p className="saved__text-keywords">
            By keywords:
            <span className="saved__text-span"> {keywordString}</span>
          </p>
        </div>
      </header>
      <NewsCardList
        loggedIn={loggedIn}
        isSavedNews={isSavedNews}
        handleUnsaveArticle={handleUnsaveArticle}
        handleConfirmPopup={handleConfirmPopup}
        keyword={keyword}
      />
    </section>
  );
};

export default SavedNews;
