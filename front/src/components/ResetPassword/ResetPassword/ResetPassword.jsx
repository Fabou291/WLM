// HOOKS
import { useState } from 'react';
// COMPONENTS
import { ResetPasswordForm, ResetPasswordConfirmation } from "../resetPasswordIndex";
import HeaderWithLogo from '../../HeaderWithLogo';
import FooterWindowsLiveId from '../../FooterWindowsLiveId';

const ResetPassword = () => {

  const [passwordHasBeenReset, setPasswordHasBeenReset] = useState(false);

  return (
    <div className="reset-password__container">
      <div className={`reset-password${passwordHasBeenReset ? " success" : ""}`}>
        <HeaderWithLogo />
        {passwordHasBeenReset
          ? <ResetPasswordConfirmation passwordHasBeenReset={passwordHasBeenReset} />
          : <ResetPasswordForm setPasswordHasBeenReset={setPasswordHasBeenReset} />
        }
        <FooterWindowsLiveId />
      </div>
    </div>
  );
};

export default ResetPassword;