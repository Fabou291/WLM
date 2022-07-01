// HOOKS 
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// COMPONENTS
import ResetPasswordInstructions from './ResetPasswordInstructions';
import ResetPasswordInput from './ResetPasswordInput';
import ResetPasswordSubmit from './ResetPasswordSubmit';
// FETCH
import { fetchResetPassword } from '../../../helpers/fetch';
// HELPERS
import passwordsValidator from '../../../helpers/passwordsValidator';

const ResetPasswordForm = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [apiResetPasswordEndpoint, setApiResetPasswordEndpoint] = useState(null);
  const [submitError, setSubmitError] = useState(false);

  const handleResetPasswordButton = async (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    setSubmitError(false);

    try {
      const passwords = passwordsValidator(elements);
      await fetchResetPassword(apiResetPasswordEndpoint, passwords);
    }
    catch (err) {
      typeof err === "string"
        ? setSubmitError(err)
        : setSubmitError(err.message);
    }
  };

  useEffect(() => {
    const getUrlToken = searchParams.get("token");
    if (!getUrlToken) {
      navigate("/login");
    }

    const decodedUrlToken = atob(getUrlToken);
    setApiResetPasswordEndpoint(decodedUrlToken);
  }, []);

  return (
    <form
      className="reset-password__form"
      onSubmit={handleResetPasswordButton}
    >
      <ResetPasswordInstructions />
      <ResetPasswordInput submitError={submitError} />
      <ResetPasswordSubmit />
    </form>
  );
};

export default ResetPasswordForm;