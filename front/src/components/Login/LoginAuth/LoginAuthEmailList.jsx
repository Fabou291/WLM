// HOOKS
import { useRef, useContext, useEffect } from 'react';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// HELPERS
import clickOutside from '../../../helpers/clickOutside';
import replaceUserInfosWithSelectedEmail from '../../../helpers/login/replaceUserInfosWithSelectedEmail';

const LoginAuthEmailList = (props) => {
  const { setShowEmailsList, dropDownButtonTarget } = props;

  const { setResetForm, formUpdate, setFormUpdate, storageData } = useContext(loginContext);
  const listContainerRef = useRef();

  const handleClick = ({ target }) => {
    console.log(formUpdate);
    const { innerText: targetEmail } = target;

    replaceUserInfosWithSelectedEmail(targetEmail, storageData, formUpdate, setFormUpdate);
    setShowEmailsList(false);
  };

  const useAnotherId = () => {

    console.log('Utiliser un autre identifiant Windows Live ID');
    setResetForm(true);
    setShowEmailsList(false);
  };

  const clickOutsideHandler = e => {
    const options = [
      listContainerRef,
      setShowEmailsList,
      dropDownButtonTarget,
      e.target
    ];

    clickOutside(...options);
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, []);



  return (
    <ul className="login-email__list" ref={listContainerRef}>
      {(storageData.stored.length !== 0) && storageData.stored
        .map((user, idx) => (
          <li key={idx} onClick={handleClick}>{user.email}</li>
        ))}
      <li onClick={useAnotherId}>Utiliser un autre identifiant Windows Live ID</li>
    </ul>
  );
};

export default LoginAuthEmailList;