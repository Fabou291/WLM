// HOOKS
import { useState } from 'react';
import { AskResetPasswordInput, AskResetPasswordInstructions, AskResetPasswordSubmit } from "../resetPasswordIndex";
// HELPERS
import { fetchAskResetPassword } from '../../../helpers/fetch';

const AskResetPasswordForm = ({ setResetPasswordDemandSent }) => {

  const [submitError, setSubmitError] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handleAskResetPasswordButton = async (event) => {
    event.preventDefault();
    const email = event.target.elements[0].value;
    setSubmitError(false);

    try {
      setIsSendingRequest(true);
      await fetchAskResetPassword(email);
      setResetPasswordDemandSent(true);
    }
    catch (err) {
      typeof err === "string"
        ? setSubmitError(err)
        : setSubmitError(err.message);
    }
    finally {
      setIsSendingRequest(false);
    }

  };

  return (
    <form
      className="ask-reset-password__form"
      onSubmit={handleAskResetPasswordButton}
    >
      <AskResetPasswordInstructions />
      <AskResetPasswordInput />
      <AskResetPasswordSubmit data={{ isSendingRequest, submitError }} />
    </form>
  );
};

export default AskResetPasswordForm;