import AskResetPasswordInput from './AskResetPasswordInput';
import AskResetPasswordInstructions from './AskResetPasswordInstructions';
import AskResetPasswordSubmit from './AskResetPasswordSubmit';

import { fetchAskResetPassword } from '../../../helpers/fetch';
import { useState } from 'react';

const AskResetPasswordForm = () => {

  const [submitError, setSubmitError] = useState(false);

  const handleAskResetPasswordButton = async (event) => {
    event.preventDefault();
    const email = event.target.elements[0].value;
    setSubmitError(false);

    try {
      await fetchAskResetPassword(email);
    }
    catch (err) {
      setSubmitError(true);
    }

  };

  return (
    <form
      className="ask-reset-password__form"
      onSubmit={handleAskResetPasswordButton}
    >
      <AskResetPasswordInstructions />
      <AskResetPasswordInput submitError={submitError} />
      <AskResetPasswordSubmit />
    </form>
  );
};

export default AskResetPasswordForm;