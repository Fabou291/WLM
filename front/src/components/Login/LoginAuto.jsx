// HOOKS
import { useContext, useRef } from 'react';
// CONTEXT
import loginContext from '../../contexts/LoginContext';

const LoginAuto = () => {

  const { formUpdate, setFormUpdate } = useContext(loginContext);
  const autoAuthCheckRef = useRef();

  const handleRememberLogin = () => {
    const { checked: isLoginAutoChecked } = autoAuthCheckRef.current;

    const updatedCheckboxes = {
      autoAuth: isLoginAutoChecked
    };

    setFormUpdate(prev => ({
      ...prev,
      ...updatedCheckboxes
    }));
  };

  return (
    <div className="auto-login__container">
      <input
        type="checkbox"
        id="auto-login"
        ref={autoAuthCheckRef}
        checked={formUpdate.autoAuth}
        onChange={handleRememberLogin}
      />
      <label htmlFor="auto-login">Connexion automatique</label>
    </div>
  );

};

export default LoginAuto;