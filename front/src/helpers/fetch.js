import { loginApiUrl, userInfosApiUrl, askResetPasswordUrl } from '../data.js/apiUrls';

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

export const fetchAskResetPassword = async (email) => {
  const response = await fetch(askResetPasswordUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (response.ok === false) {
    throw ("erreur");
  }
};