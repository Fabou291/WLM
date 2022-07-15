// HOOKS 
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// COMPONENTS
import { ResetPasswordInstructions, ResetPasswordInput, ResetPasswordSubmit } from "../resetPasswordIndex";
// FETCH
import { fetchResetPassword } from '../../../helpers/fetch';
// HELPERS
import passwordsValidator from '../../../validators/passwordsValidator';

const ResetPasswordForm = ({ setPasswordHasBeenReset }) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [apiResetPasswordEndpoint, setApiResetPasswordEndpoint] = useState(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleResetPasswordButton = async (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    setSubmitError(false);

    try {
      const passwords = passwordsValidator(elements);
      setIsSendingRequest(true);
      await fetchResetPassword(apiResetPasswordEndpoint, passwords);
      setPasswordHasBeenReset(true);
    }
    catch (err) {
      typeof err === "string"
        ? setSubmitError(err)
        : setSubmitError(err.message);
    }
    finally {
      setIsSendingRequest(false);
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
      <ResetPasswordSubmit data={{ isSendingRequest, submitError }} />
    </form>
  );
};

export default ResetPasswordForm;