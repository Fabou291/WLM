// HOOKS
import { useState } from 'react';
// COMPONENTS
import { AskResetPasswordConfirmation, AskResetPasswordForm } from "../resetPasswordIndex";
import HeaderWithLogo from '../../HeaderWithLogo';
import FooterWindowsLiveId from '../../FooterWindowsLiveId';

const AskResetPassword = () => {

  const [resetPasswordDemandSent, setResetPasswordDemandSent] = useState(false);

  return (
    <div className={"ask-reset-password__container"}>
      <div className={`ask-reset-password${resetPasswordDemandSent ? " success" : ""}`}>
        <HeaderWithLogo />
        {resetPasswordDemandSent
          ? <AskResetPasswordConfirmation />
          : <AskResetPasswordForm setResetPasswordDemandSent={setResetPasswordDemandSent} />
        }
        <FooterWindowsLiveId />
      </div>
    </div>
  );
};

export default AskResetPassword;