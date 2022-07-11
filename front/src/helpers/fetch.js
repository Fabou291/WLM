import { loginApiUrl, userInfosApiUrl, askResetPasswordUrl, getResetPasswordUrl } from '../data/apiUrls';

let options = { credentials: "include" };

export const fetchLogin = async (data, currentAbortController) => {

  const optionsLogin = {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: currentAbortController.signal
  };

  const response = await fetch(loginApiUrl, optionsLogin);
  if (response.ok === false) {
    throw ("Informations incorrectes");
  }
  const userData = await response.json();

  return userData;
};

export const fetchMeFromLogin = async (currentAbortController) => {
  const optionsMe = {
    ...options,
    signal: currentAbortController.signal
  };

  const response = await fetch(userInfosApiUrl, optionsMe);
  if (response.ok === false) {
    throw ("Non authentifié");
  }

  const userData = await response.json();
  return userData;
};

export const fetchMe = async () => {
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
    throw ("Erreur lors de la requête");
  }
};

export const fetchResetPassword = async (endpoint, data) => {
  const optionsLogin = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(getResetPasswordUrl(endpoint), optionsLogin);
  if (response.ok === false) {
    throw ("Erreur lors de la requête");
  }
};