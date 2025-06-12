import { checkResponse } from "./NewsApi";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api-newsexplorer.utdnews.com"
    : "http://localhost:3001";

// const authorize = (email, password) => {
//   return new Promise((resolve) => {
//     resolve({ token: "jwt" });
//   });
// };

const signUp = ({ email, password, username }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  }).then(checkResponse);
};

const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

const editProfile = ({ username }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  }).then(checkResponse);
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const auth = {
  checkToken,
  signUp,
  signIn,
  editProfile,
};

export default auth;
