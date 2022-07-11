const passwordsValidator = (elements) => {
  const password = elements[0].value;
  const passwordConfirmation = elements[1].value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{12,}$/;

  if (password !== passwordConfirmation) {
    throw ("Les mots de passe doivent être identiques");
  }

  if (!regex.test(password) || !regex.test(passwordConfirmation)) {
    throw ("Le mot de passe ne respecte pas les conditions imposées");
  }

  return { password, passwordConfirmation };
};

export default passwordsValidator;