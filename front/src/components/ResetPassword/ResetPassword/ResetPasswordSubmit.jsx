const ResetPasswordSubmit = ({ data }) => {

  const { isSendingRequest, submitError } = data;

  return (
    <>
      <div className="reset-password__button__container">
        <input type="submit" className="reset-password__button" />
        {isSendingRequest && <small>Envoi de la requête...</small>}
        {submitError && <small className="error">{submitError}</small>}
      </div>
    </>
  );
};

export default ResetPasswordSubmit;