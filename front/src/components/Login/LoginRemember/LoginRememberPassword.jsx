// HOOKS
import { useContext, useRef } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginRememberPassword = () => {

  const { formUpdate, setFormUpdate } = useContext(loginContext);
  const passwordCheckRef = useRef();

  const handleRememberPassword = () => {
    const { checked: isRememberPasswordChecked } = passwordCheckRef.current;

    const updatedCheckboxes = {
      rememberPassword: isRememberPasswordChecked
    };

    if (isRememberPasswordChecked === true) {
      updatedCheckboxes.rememberEmail = true;
    }

    if (isRememberPasswordChecked === false) {
      updatedCheckboxes.autoAuth = false;
    }

    setFormUpdate(prev => ({
      ...prev,
      ...updatedCheckboxes
    }));
  };

  return (
    <div className="remember__container">
      <input
        type="checkbox"
        id="remember-password"
        ref={passwordCheckRef}
        onChange={handleRememberPassword}
        checked={formUpdate.rememberPassword}
      />
      <label htmlFor="remember_password">Mémoriser mon mot de passe</label>
    </div>
  );
};

export default LoginRememberPassword;