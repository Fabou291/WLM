import { useNavigate } from 'react-router-dom';

const LoginResetPasswordButton = () => {

  const navigate = useNavigate();

  const switchToAskResetForm = () => {
    navigate("/reset-password/demand");
  };

  return (
    <button
      type="button"
      className="reset-password__btn"
      onClick={switchToAskResetForm}
    >
      Mot de passe oublié ?
    </button>
  );
};

export default LoginResetPasswordButton;