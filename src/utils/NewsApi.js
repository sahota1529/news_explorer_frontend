const baseURL = "https://nomoreparties.co/news/v2/everything?";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

const toDate = new Date();
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 7);

export const searchNews = (query) => {
  return fetch(
    `${baseURL}q=${query}&from=${fromDate.toISOString().split("T")[0]}&to=${
      toDate.toISOString().split("T")[0]
    }&sortBy=popularity&apiKey=663a0d369c804991876228c962b02454&pageSize=100`,
    {
      method: "GET",
    }
  ).then(checkResponse);
};

export const getTempCards = () => {
  return fetch(
    `${baseURL}q=breaking&from=${fromDate.toISOString().split("T")[0]}&to=${
      toDate.toISOString().split("T")[0]
    }&sortBy=popularity&apiKey=663a0d369c804991876228c962b02454&pageSize=10`,
    {
      method: "GET",
    }
  ).then(checkResponse);
};

export function saveArticle({ article }) {
  return new Promise((resolve) => {
    resolve({
      id: "65f7371e7bce9e7d331b11a0",
      title: article.title,
      urlToImage: article.urlToImage,
      url: article.url,
    });
  });
}
