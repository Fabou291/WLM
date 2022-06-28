// HOOKS
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
import globalContext from '../../contexts/GlobalContext';
// HELPERS
import { fetchLogin } from '../../helpers/fetch';

const LoginSubmit = () => {

  const { isConnecting, setIsConnecting, formUpdate } = useContext(loginContext);
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const navigate = useNavigate();

  const handleLoginSubmit = () => {
    if (isConnecting === false) {
      loginRequest();
      setIsConnecting(true);
    }
    else {
      setIsConnecting(false);
    }
  };

  const loginRequest = async () => {
    const { email, password, autoAuth: remember } = formUpdate;

    try {
      const userData = await fetchLogin({ email, password, remember });
      setUserDataFromDb(userData);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (userDataFromDb) {
      console.log(userDataFromDb);
      navigate("/");
    }
  }, [userDataFromDb]);


  return (
    <input
      type="submit"
      value={isConnecting ? "Annuler" : "Connexion"}
      id="connect__btn"
      onClick={handleLoginSubmit}
    />
  );

};

export default LoginSubmit;