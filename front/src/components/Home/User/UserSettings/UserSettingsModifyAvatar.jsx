// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserSettingsModifyAvatar = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  return (
    <div>UserSettingsModifyAvatar</div>
  );
};

export default UserSettingsModifyAvatar;