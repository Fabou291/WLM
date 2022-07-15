// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserAvatar = () => {

  const { userDataFromDb } = useContext(globalContext);

  return (
    <div>UserAvatar</div>
  );
};

export default UserAvatar;