// React
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import LoginPopup from "../LoginPopup/LoginPopup";
import EditPopup from "../EditPopup/EditPopup";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// API
import { searchNews } from "../../utils/NewsApi";
import auth from "../../utils/auth";
import { saveArticle, unsaveArticle } from "../../utils/article-api";

// Context
import { UserContext } from "../../contexts/UserContext";
import { ArticleContext } from "../../contexts/ArticleContext";
import { SavedArticleContext } from "../../contexts/SavedArticleContext";

function App() {
  // State Variables
  const [activePopup, setActivePopup] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [isSavedNews, setIsSavedNews] = useState(false);
  const [error, setError] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [keyword, setKeyword] = useState([]);
  const [serverError, setServerError] = useState({});

  // Popups

  const handleRegisterPopup = () => {
    setActivePopup("register");
  };

  const handleEditPopup = () => {
    setActivePopup("edit");
  };

  const handleConfirmPopup = (article) => {
    setActivePopup("confirm");
    setArticle(article);
  };

  const handleSuccessPopup = () => {
    setActivePopup("success");
  };

  const handleClosePopup = () => {
    setActivePopup("");
  };

  const handleLoginPopup = () => {
    setActivePopup("login");
  };

  const showMoreArticles = () => {
    setShownArticles((prev) => prev + 3);
  };

  // Articles

  const handleSearchResults = (query) => {
    searchNews(query)
      .then((data) => {
        setSearching(true);
        setTimeout(() => {
          const filteredArticles = data.articles.filter(
            (article) =>
              article.urlToImage &&
              article.title &&
              !article.title.includes("[Removed]")
          );
          setArticles(filteredArticles);
          setIsLoading(false);
        }, 500);
        setKeyword(query);
      })
      .catch((err) => {
        console.log(err);
        setError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
      });
  };

  const handleSaveArticle = ({ article }, keyword) => {
    const token = localStorage.getItem("jwt");
    saveArticle({ article }, token, keyword)
      .then((savedArticles) => {
        setSavedArticles((prevArticles) => [...prevArticles, savedArticles]);
      })
      .catch((err) => console.log(err));
  };

  const handleUnsaveArticle = (article) => {
    const token = localStorage.getItem("jwt");
    unsaveArticle(article._id, token)
      .then(() => {
        const postUnsave = savedArticles.filter((card) => {
          return card._id !== article._id;
        });
        setSavedArticles(postUnsave);
        handleClosePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // User Functions

  const handleRegister = ({ email, password, username }) => {
    auth
      .signUp({ email, password, username })
      .then((res) => {
        if (res) {
          handleSuccessPopup();
        }
      })
      .catch((err) => {
        setServerError({
          ...serverError,
          conflictError: "Email is already in use",
        });
        console.log(err);
      });
  };

  const handleEditProfile = ({ username }) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile({ username }, token)
      .then((res) => {
        setUser(res);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setUser(res);
          setLoggedIn(true);
          handleClosePopup();
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError({
          ...serverError,
          invalidError: "Invalid credentials",
        });
      });
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  // useEffects

  useEffect(() => {
    if (!activePopup) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activePopup]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <>
      <UserContext.Provider value={user}>
        <ArticleContext.Provider
          value={{ articles, setArticles, shownArticles, setShownArticles }}
        >
          <SavedArticleContext.Provider
            value={{ savedArticles, setSavedArticles }}
          >
            <div className="page">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <>
                      <Header
                        openPopup={handleLoginPopup}
                        handleSubmit={handleSearchResults}
                        loggedIn={loggedIn}
                        handleLogout={handleLogout}
                        handleEditPopup={handleEditPopup}
                        setSearching={setSearching}
                        setIsLoading={setIsLoading}
                        setArticles={setArticles}
                      />
                      <Main
                        articles={articles}
                        keyword={keyword}
                        showMoreArticles={showMoreArticles}
                        isLoading={isLoading}
                        searching={searching}
                        loggedIn={loggedIn}
                        error={error}
                        openPopup={handleLoginPopup}
                        handleSaveArticle={handleSaveArticle}
                      />
                    </>
                  }
                />
                <Route
                  path="/saved-news"
                  element={
                    <ProtectedRoute loggedIn={loggedIn}>
                      <SavedNews
                        loggedIn={loggedIn}
                        isSavedNews={true}
                        handleLogout={handleLogout}
                        openPopup={handleRegisterPopup}
                        savedArticles={savedArticles}
                        handleEditPopup={handleEditPopup}
                        handleUnsaveArticle={handleUnsaveArticle}
                        handleConfirmPopup={handleConfirmPopup}
                        keyword={keyword}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer isSavedNews={isSavedNews} />
              <RegisterPopup
                isOpen={activePopup === "register"}
                closePopup={handleClosePopup}
                handleLoginPopup={handleLoginPopup}
                handleSuccessPopup={handleSuccessPopup}
                handleRegister={handleRegister}
                serverError={serverError}
                setServerError={setServerError}
              />
              <LoginPopup
                isOpen={activePopup === "login"}
                closePopup={handleClosePopup}
                handleRegisterPopup={handleRegisterPopup}
                handleLogin={handleLogin}
                serverError={serverError}
                setServerError={setServerError}
              />
              <SuccessPopup
                isOpen={activePopup === "success"}
                closePopup={handleClosePopup}
                handleLoginPopup={handleLoginPopup}
              />
              <EditPopup
                isOpen={activePopup === "edit"}
                closePopup={handleClosePopup}
                handleEditProfile={handleEditProfile}
              />
              <ConfirmPopup
                isOpen={activePopup === "confirm"}
                closePopup={handleClosePopup}
                handleUnsaveArticle={handleUnsaveArticle}
                article={article}
              />
            </div>
          </SavedArticleContext.Provider>
        </ArticleContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
