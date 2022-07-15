// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserSettingsStatus = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  return (
    <div>UserSettingsStatus</div>
  );
};

export default UserSettingsStatus;