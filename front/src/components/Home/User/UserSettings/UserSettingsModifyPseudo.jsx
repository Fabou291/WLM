// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserSettingsModifyPseudo = (props) => {

  const { setShowSettings } = props;

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  const handleModifyPseudo = () => {
    console.log("handleModifyPseudo");
    setShowSettings(false);
  };

  return (
    <li
      className="list-settings"
      onClick={handleModifyPseudo}
    >
      Modifier le pseudo
    </li>
  );
};

export default UserSettingsModifyPseudo;