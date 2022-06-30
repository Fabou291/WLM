

const AskResetPasswordInput = ({ submitError }) => {
  return (
    <div className="label-input__container">
      <label>Saisissez votre email</label>
      <input type="email" required />
      {submitError && (
        <small>Une erreur est survenue.</small>
      )}
    </div>
  );
};

export default AskResetPasswordInput;
