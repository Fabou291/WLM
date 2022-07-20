// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserSettingsModifyAvatar = (props) => {

  const { setShowSettings } = props;

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  const handleModifyAvatar = () => {
    console.log("handleModifyAvatar");
    setShowSettings(false);
  };

  return (
    <li
      className="list-settings"
      onClick={handleModifyAvatar}
    >
      Modifier l'image perso
    </li>
  );
};

export default UserSettingsModifyAvatar;