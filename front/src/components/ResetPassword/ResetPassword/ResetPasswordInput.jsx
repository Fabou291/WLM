
const ResetPasswordInput = ({ submitError }) => {
  return (
    <>
      <div className="label-input__container first-password">
        <label>Saisissez votre nouveau mot de passe</label>
        <input type="password" required />
      </div>

      <div className="label-input__container second-password">
        <label>Confirmez votre nouveau mot de passe</label>
        <input type="password" required />
        {submitError && (
          <small>{submitError}</small>
        )}
      </div>
    </>
  );
};

export default ResetPasswordInput;