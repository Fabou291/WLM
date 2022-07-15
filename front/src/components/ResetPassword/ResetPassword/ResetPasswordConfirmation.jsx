// HOOKS
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordConfirmation = () => {

  const navigate = useNavigate();

  const [redirectTimer, setRedirectTimer] = useState(3);

  const countDown = () => setRedirectTimer(prev => prev - 1);

  useEffect(() => {
    const timer = setInterval(countDown, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirectTimer === 0) {
      navigate("/login");
    }
  }, [redirectTimer]);

  return (
    <div className="password-reset-succes">
      <p>Votre mot de passe à été réinitialisé.</p>
      <p>Redirection dans {redirectTimer} seconde(s).</p>
    </div>
  );
};

export default ResetPasswordConfirmation;