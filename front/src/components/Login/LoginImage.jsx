// HOOKS
import { useContext } from 'react';
// CONTEXT
import loginContext from '../../contexts/LoginContext';

const LoginImage = () => {

  const { formUpdate } = useContext(loginContext);

  return (
    <div className="img__container">
      <img
        src={formUpdate.avatar}
        alt="user's avatar"
        className="avatar"
      />
    </div>
  );
};

export default LoginImage;