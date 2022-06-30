// HOOKS
import { useEffect, useRef, useState } from 'react';
// COMPONENTS
import {
  LoginAuth,
  LoginImage,
  LoginRemember,
  LoginStatus,
  LoginSubmit,
  LoginResetPasswordButton
} from './loginIndex';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
// DATA
import formLoginData from '../../data.js/formLoginData';

const Login = () => {

  const [formUpdate, setFormUpdate] = useState({ ...formLoginData });
  const [resetForm, setResetForm] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const formRef = useRef();
  const providerValues = {
    resetForm,
    setResetForm,
    formUpdate,
    setFormUpdate,
    isConnecting,
    setIsConnecting
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  useEffect(() => {
    if (resetForm) {
      setFormUpdate({ ...formLoginData });
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <loginContext.Provider value={providerValues}>
      <div className="login__container">
        <form className={`login__container__form ${isConnecting ? "disabled" : ""}`} ref={formRef} onSubmit={handleSubmit}>
          <LoginImage />
          <LoginAuth />
          <LoginStatus />
          <LoginRemember />
          <LoginSubmit />
        </form>
        <LoginResetPasswordButton />
      </div>
    </loginContext.Provider>
  );
};

export default Login;