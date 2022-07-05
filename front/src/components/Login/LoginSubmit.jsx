// HOOKS
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
import globalContext from '../../contexts/GlobalContext';
// HELPERS
import { fetchLogin, fetchMeFromLogin } from '../../helpers/fetch';
import handleStorageWhenAuthenticated from '../../helpers/handleStorageWhenAuthenticated';

const LoginSubmit = () => {
  const { isConnecting, setIsConnecting, formUpdate, storageData } = useContext(loginContext);
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const abortController = useRef(null);
  const navigate = useNavigate();

  const [isAborting, setIsAborting] = useState(false);
  const [hasClickedSubmitBtn, setHasClickedSubmitBtn] = useState(false);

  const meOrLoginRequest = async (requestChoice) => {
    const { email, password, autoAuth: remember } = formUpdate;
    let currentUser;
    abortController.current = new AbortController();

    if (requestChoice === "login") {
      currentUser = await fetchLogin({ email, password, remember }, abortController.current);
    }

    if (requestChoice === "me") {
      currentUser = await fetchMeFromLogin(abortController.current);
    }

    setUserDataFromDb(currentUser);
    handleStorageWhenAuthenticated(currentUser, remember);
  };

  useEffect(() => {
    if (isConnecting) {
      const handleLoginSubmit = async () => {
        try {
          if (storageData?.remember === true && hasClickedSubmitBtn === false) {
            await meOrLoginRequest("me");
            return;
          }

          await meOrLoginRequest("login");
        }
        catch (err) {
          console.log(err);
        }
        finally {
          setIsConnecting(false);
        }
      };

      handleLoginSubmit();
    }
  }, [isConnecting]);


  useEffect(() => {
    if (isAborting === true && abortController.current) {
      abortController.current.abort();
      setIsAborting(false);
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
        setHasClickedSubmitBtn(true);
        isConnecting && setIsAborting(true);
      }}
    />
  );

};

export default LoginSubmit;