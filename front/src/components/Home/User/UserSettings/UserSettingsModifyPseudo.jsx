// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserSettingsModifyPseudo = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  return (
    <div>UserSettingsModifyPseudo</div>
  );
};

export default UserSettingsModifyPseudo;