// HOOKS
import { useContext, useRef } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// HELPERS
import { deleteOneUserFromStorage } from '../../../helpers/handleStorage';
// DATA
import formLoginData from '../../../data/formLoginData';

const LoginRememberEmail = () => {

  const { formUpdate, setFormUpdate, isEmailOnInputSaved, setStorageData } = useContext(loginContext);
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
    deleteOneUserFromStorage(formUpdate.email, setStorageData);
    setFormUpdate(formLoginData);
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
        style={{ visibility: isEmailOnInputSaved ? "visible" : "hidden" }}
      >
        (Effacer)
      </button>
    </>
  );
};

export default LoginRememberEmail;