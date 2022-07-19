// HOOKS
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import loginContext from '../../contexts/LoginContext';
import globalContext from '../../contexts/GlobalContext';
// HELPERS
import { fetchLogin, fetchMeFromLogin } from '../../helpers/fetch';
import { handleStorageWhenAuthenticated } from '../../helpers/handleStorage';

const LoginSubmit = () => {

  const { isConnecting, setIsConnecting, formUpdate, storageData } = useContext(loginContext);
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const abortControllerRef = useRef(null);
  const timerStartRef = useRef(null);
  const timerEndRef = useRef(null);
  const timeoutRef = useRef(null);
  const userFetchRef = useRef(null);
  const navigate = useNavigate();

  const [isAborting, setIsAborting] = useState(false);
  const [hasClickedSubmitBtn, setHasClickedSubmitBtn] = useState(false);

  const meOrLoginRequest = async (requestChoice) => {
    const { email, password, autoAuth: remember, rememberEmail } = formUpdate;
    abortControllerRef.current = new AbortController();

    timerStartRef.current = Date.now();

    if (requestChoice === "login") {
      userFetchRef.current = await fetchLogin({ email, password, remember }, abortControllerRef.current);
    }

    if (requestChoice === "me") {
      userFetchRef.current = await fetchMeFromLogin(abortControllerRef.current);
    }

    userFetchRef.current.status = formUpdate.status;

    timerEndRef.current = Date.now();
    const fetchRequestDuration = timerEndRef.current - timerStartRef.current;

    if (fetchRequestDuration < 3000) {
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(resolve, 3000 - fetchRequestDuration);
      });
    }

    setUserDataFromDb(userFetchRef.current);
    handleStorageWhenAuthenticated(userFetchRef.current, remember, rememberEmail);
  };

  useEffect(() => {
    if (isConnecting) {
      const handleLoginSubmit = async () => {
        try {
          if (storageData.current !== null && hasClickedSubmitBtn === false) {
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
    if (isAborting === true && abortControllerRef.current) {
      clearTimeout(timeoutRef.current);
      abortControllerRef.current.abort();
      setIsAborting(false);
    }
  }, [isAborting]);

  useEffect(() => {
    if (userDataFromDb) {
      navigate("/");
    }
  }, [userDataFromDb]);

  return (
    <button
      type="button"
      id="connect__btn"
      onClick={() => {
        setIsConnecting(prev => !prev);
        setHasClickedSubmitBtn(true);
        isConnecting && setIsAborting(true);
      }}
    >
      {isConnecting ? "Annuler" : "Connexion"}
    </button>
  );

};

export default LoginSubmit;