import { useState } from 'react';
import AskResetPasswordConfirmation from './AskResetPasswordConfirmation';
import AskResetPasswordForm from './AskResetPasswordForm';

const AskResetPassword = () => {

  const [resetPasswordDemandSent, setResetPasswordDemandSent] = useState(false);

  return (
    <div className={`ask-reset-password__container${resetPasswordDemandSent ? " success" : ""}`}>
      {resetPasswordDemandSent
        ? <AskResetPasswordConfirmation />
        : <AskResetPasswordForm setResetPasswordDemandSent={setResetPasswordDemandSent} />
      }
    </div>
  );
};

export default AskResetPassword;