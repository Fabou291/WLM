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
import getStorageRemember from '../../helpers/getStorageRemember';

const Login = () => {

  const formRef = useRef();

  const [formUpdate, setFormUpdate] = useState({ ...formLoginData });
  const [resetForm, setResetForm] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [storageData, setStorageData] = useState({
    stored: [],
    current: null
  });

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

    if (storageUsersInfos.current || storageUsersInfos.stored.length !== 0) {
      const remember = getStorageRemember();

      let email, status, avatar;

      if (storageUsersInfos.current) {
        const { current } = storageUsersInfos;
        email = current.email;
        status = current.status;
        avatar = current.avatar;
      }
      else if (storageUsersInfos.stored.length !== 0) {
        const { stored } = storageUsersInfos;
        email = stored[0].email;
        status = stored[0].status;
        avatar = stored[0].avatar;
      }
      setStorageData({ ...storageUsersInfos, remember });
      setFormUpdate({
        password: "",
        email,
        status,
        avatar,
        rememberEmail: true,
        rememberPassword: true,
        autoAuth: remember
      });

      if (remember) {
        setIsConnecting(true);
      }
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