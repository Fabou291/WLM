// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserAvatar = () => {

  const { userDataFromDb } = useContext(globalContext);

  return (
    <div className="user-avatar__container">
      <img
        src={"http://localhost:3333/" + userDataFromDb.avatar}
        alt="Avatar de l'utilisateur"
        className="avatar"
      />
    </div>
  );
};

export default UserAvatar;