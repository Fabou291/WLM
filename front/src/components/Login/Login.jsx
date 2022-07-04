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
// HELPERS
import getStorageUsersInfos from '../../helpers/getStorageUsersInfos';

const Login = () => {

  const [formUpdate, setFormUpdate] = useState({ ...formLoginData });
  const [resetForm, setResetForm] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [storageData, setStorageData] = useState(null);
  const formRef = useRef();
  const providerValues = {
    resetForm,
    setResetForm,
    formUpdate,
    setFormUpdate,
    isConnecting,
    setIsConnecting,
    storageData,
    setStorageData
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

  useEffect(() => {
    const storageUsersInfos = getStorageUsersInfos();

    if (storageUsersInfos) {
      setStorageData(storageUsersInfos);
    }
  }, []);

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