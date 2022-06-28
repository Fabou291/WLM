// HOOKS
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import loginContext from '../../contexts/LoginContext';

const LoginSubmit = () => {

  const loginPath = "http://localhost:3333/api/auth/login";
  const { isConnecting, setIsConnecting, formUpdate } = useContext(loginContext);
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(false);

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
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember }),
      credentials: "include"
    };

    try {
      const response = await fetch(loginPath, options);
      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        navigate("/home");
        console.log(data);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsConnecting(false);
    }
  };


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