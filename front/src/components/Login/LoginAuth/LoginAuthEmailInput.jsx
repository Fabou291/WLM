// HOOKS
import { useContext } from 'react';
// ICONS
import ArrowIcon from '../../../icons/dropDownArrow';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// HELPERS
import replaceUserInfosWithSelectedEmail from '../../../helpers/replaceUserInfosWithSelectedEmail';
// DATA
import formLoginData from '../../../data.js/formLoginData';

const LoginAuthEmailInput = (props) => {

  const { handleEmailList } = props;
  const { formUpdate, setFormUpdate, isConnecting, storageData } = useContext(loginContext);

  const handleCurrentEmailInput = (input, inputType) => {
    const { stored } = storageData;
    const matchingEmails = [];

    if (stored.length === 0) {
      setFormUpdate({ ...formUpdate, email: input });
      return;
    }

    for (const { email } of stored) {
      const isInputEqualEmail = email === input;
      const isInputIncludesEmail = email.includes(input);

      if (inputType !== "insertText" && inputType !== "insertFromPaste") {
        if (isInputEqualEmail) {
          replaceUserInfosWithSelectedEmail(input, storageData, formUpdate, setFormUpdate);
        }
        else {
          setFormUpdate({ ...formLoginData, email: input });
        }
        return;
      }

      if (isInputIncludesEmail) {
        matchingEmails.push(email);
      }
    }

    if (matchingEmails.length === 1) {
      replaceUserInfosWithSelectedEmail(matchingEmails[0], storageData, formUpdate, setFormUpdate);
      return;
    }

    setFormUpdate({ ...formLoginData, email: input });
  };

  const handleEmailInput = (event) => {
    const value = event.target.value;
    const { inputType } = event.nativeEvent;

    handleCurrentEmailInput(value, inputType);
  };

  return (
    <>
      <label htmlFor="emailLogin">Adresse de messagerie :</label>
      <div className="email-input__container">
        <input
          type="email"
          id="emailLogin"
          disabled={isConnecting}
          value={formUpdate.email}
          onChange={handleEmailInput}
        />
        <button type="button" className="dropdown" onClick={handleEmailList}>
          < ArrowIcon />
        </button>
      </div>
    </>
  );
};

export default LoginAuthEmailInput;