import { loginApiUrl, userInfosApiUrl } from '../data.js/apiUrls';

let options = { credentials: "include" };

export const fetchLogin = async (data) => {

  const optionsLogin = {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(loginApiUrl, optionsLogin);
  if (response.ok === false) {
    throw ("Informations incorrectes");
  }
  const userData = await response.json();

  return userData;
};

export const fetchUserInfos = async () => {
  const response = await fetch(userInfosApiUrl, options);
  if (response.ok === false) {
    throw ("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};