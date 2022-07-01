const passwordsValidator = (elements) => {
  const password = elements[0].value;
  const passwordConfirmation = elements[1].value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{12,}$/;

  if (password !== passwordConfirmation) {
    throw ("Les 2 mots de passe ne sont pas identique");
  }

  if (!regex.test(password) || !regex.test(passwordConfirmation)) {
    throw ("Non respect de la regex");
  }

  return { password, passwordConfirmation };
};

export default passwordsValidator;