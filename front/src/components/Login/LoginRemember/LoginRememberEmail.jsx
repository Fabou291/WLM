// HOOKS
import { useContext, useRef } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';

const LoginRememberEmail = () => {

  const { formUpdate, setFormUpdate } = useContext(loginContext);
  const emailCheckRef = useRef();

  const handleRememberEmailAndStatus = () => {
    const { checked: isRememberEmailChecked } = emailCheckRef.current;

    const updatedCheckboxes = {
      rememberEmail: isRememberEmailChecked
    };

    if (isRememberEmailChecked === false) {
      updatedCheckboxes.rememberPassword = false;
      updatedCheckboxes.autoAuth = false;
    }

    setFormUpdate(prev => ({
      ...prev,
      ...updatedCheckboxes
    }));
  };

  const handleForgetEmailAndStatus = () => {
    console.log('Forget email and status');
    // deleting seleted email & status from storage or cookies 
  };

  return (
    <>
      <div className="remember__container">
        <input
          type="checkbox"
          id="remember_email"
          ref={emailCheckRef}
          checked={formUpdate.rememberEmail}
          onChange={handleRememberEmailAndStatus}
        />
        <label htmlFor="remember_email">Mémoriser mon adresse</label>
      </div>
      <button
        type="button"
        className="delete-saved"
        onClick={handleForgetEmailAndStatus}
      >
        (Effacer)
      </button>
    </>
  );
};

export default LoginRememberEmail;