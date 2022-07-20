// HOOKS
import { useState, useContext } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';
// COMPONENTS
import { UserSettingsList } from "../userIndex";
// DATA
import statusList from '../../../../data/statusList';
// ICONS
import ArrowIcon from '../../../../icons/dropDownArrow';

const UserSettings = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const [showSettings, setShowSettings] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleUserSettings = ({ currentTarget }) => {
    setDropDownButtonTarget(currentTarget);
    setShowSettings(previous => !previous);
  };

  return (
    <div className="user__container-settings">
      <button
        type="button"
        className={`status-select${showSettings ? " border" : ""}`}
        onClick={handleUserSettings}>
        <span><b>{userDataFromDb.email}</b></span>
        <span className="button-sentence">({statusList[userDataFromDb.status].sentence})</span>
        <div className="user__container-dropdown" id="dropDownStatus">
          < ArrowIcon />
        </div>
      </button>
      <UserSettingsList
        classShow={showSettings ? "display-flex" : "display-none"}
        {...{ showSettings, setShowSettings, dropDownButtonTarget, setDropDownButtonTarget }}
      />
    </div>
  );
};

export default UserSettings;