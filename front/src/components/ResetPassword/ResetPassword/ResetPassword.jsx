// HOOKS
import { useState } from 'react';
// COMPONENTS
import { ResetPasswordForm, ResetPasswordConfirmation } from "../resetPasswordIndex";

const ResetPassword = () => {

  const [passwordHasBeenReset, setPasswordHasBeenReset] = useState(false);

  return (
    <div className={`reset-password__container${passwordHasBeenReset ? " success" : ""}`}>
      {passwordHasBeenReset
        ? <ResetPasswordConfirmation passwordHasBeenReset={passwordHasBeenReset} />
        : <ResetPasswordForm setPasswordHasBeenReset={setPasswordHasBeenReset} />
      }
    </div>
  );
};

export default ResetPassword;