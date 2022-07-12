// HOOKS
import { useState } from 'react';
// COMPONENTS
import { LoginAuthEmailList, LoginAuthEmailInput } from '../loginIndex';

const LoginAuthEmail = () => {

  const [showEmailsList, setShowEmailsList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleEmailList = ({ target }) => {
    setDropDownButtonTarget(target);
    setShowEmailsList(previous => !previous);
  };

  return (
    <div className="login-email__container">
      <LoginAuthEmailInput
        handleEmailList={handleEmailList}
      />
      {showEmailsList && (
        <LoginAuthEmailList
          setShowEmailsList={setShowEmailsList}
          dropDownButtonTarget={dropDownButtonTarget}
        />
      )}
    </div>
  );
};

export default LoginAuthEmail;