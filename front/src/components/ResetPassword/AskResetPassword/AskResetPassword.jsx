// HOOKS
import { useState } from 'react';
// COMPONENTS
import { AskResetPasswordConfirmation, AskResetPasswordForm } from "../resetPasswordIndex";

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