import AskResetPasswordInput from './AskResetPasswordInput';
import AskResetPasswordInstructions from './AskResetPasswordInstructions';
import AskResetPasswordSubmit from './AskResetPasswordSubmit';

const AskResetPasswordForm = () => {

  return (
    <form
      className="ask-reset-password__form"
    >
      <AskResetPasswordInstructions />
      <AskResetPasswordInput />
      <AskResetPasswordSubmit />
    </form>
  );
};

export default AskResetPasswordForm;