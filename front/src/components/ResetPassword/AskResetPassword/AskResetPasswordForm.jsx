
const AskResetPasswordForm = () => {
  return (
    <form className="ask-reset-password__form">
      <article className="instructions__container">
        <p>Vous avez oublié votre mot de passe ? Veuillez saisir l'email associé.</p>
        <p>Un email vous sera envoyé avec la signature vous autorisant à réinisitaliser le mot de passe.</p>
      </article>
      <div className="label-input__container">
        <label>Saisissez votre email</label>
        <input type="email" />
      </div>
      <input type="submit" className="send-reset-password__button" />
    </form>
  );
};

export default AskResetPasswordForm;