// HOOKS
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
import globalContext from '../../contexts/GlobalContext';
// HELPERS
import { fetchLogin } from '../../helpers/fetch';
import handleStorageWhenAuthenticated from '../../helpers/handleStorageWhenAuthenticated';

const LoginSubmit = () => {
  const { isConnecting, setIsConnecting, formUpdate } = useContext(loginContext);
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const abortController = useRef(null);
  const navigate = useNavigate();

  const [isAborting, setIsAborting] = useState(false);

  const loginRequest = async () => {
    const { email, password, autoAuth: remember } = formUpdate;

    abortController.current = new AbortController();
    const currentUser = await fetchLogin({ email, password, remember }, abortController.current);

    setUserDataFromDb(currentUser);
    handleStorageWhenAuthenticated(currentUser, remember);
  };

  useEffect(() => {
    const handleLoginSubmit = async () => {

      try {
        if (isConnecting === true) {
          await loginRequest();
        }
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsConnecting(false);
      }
    };

    handleLoginSubmit();
  }, [isConnecting]);

  useEffect(() => {
    if (isAborting === true && abortController.current) {
      abortController.current.abort();
      setIsAborting(false);
      console.log("abort...");
    }
  }, [isAborting]);

  useEffect(() => {
    if (userDataFromDb) {
      navigate("/");
    }
  }, [userDataFromDb]);

  return (
    <input
      type="submit"
      value={isConnecting ? "Annuler" : "Connexion"}
      id="connect__btn"
      onClick={() => {
        setIsConnecting(prev => !prev);
        isConnecting && setIsAborting(true);
      }}
    />
  );

};

export default LoginSubmit;