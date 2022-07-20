// HOOKS
import { useRef, useEffect, useContext, useCallback } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';
// HELPERS
import clickOutside from '../../../../helpers/clickOutside';
// DATA
import statusList from '../../../../data/statusList';
// COMPONENTS
import {
  UserSettingsModifyAvatar,
  UserSettingsModifyPseudo,
  UserSettingsDisconnect,
  UserSettingsStatus
}
  from "../userIndex";

const UserSettingsList = (props) => {

  const { setShowSettings, dropDownButtonTarget, setDropDownButtonTarget, classShow } = props;

  const settingsContainerRef = useRef();
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  const handleModifyStatus = ({ currentTarget }) => {
    const { status } = currentTarget.dataset;

    setShowSettings(false);
    setUserDataFromDb({ ...userDataFromDb, status });
  };

  const clickOutsideStatusHandler = useCallback(({ target }) => {
    console.log("🚀 ~ file: UserSettingsList.jsx ~ line 34 ~ clickOutsideStatusHandler");

    const options = [
      settingsContainerRef,
      setShowSettings,
      dropDownButtonTarget,
      target,
    ];
    clickOutside(...options);

    const isClickingOnSettings = settingsContainerRef.current.contains(target);
    const isClickingOnButton = dropDownButtonTarget.contains(target);

    if (isClickingOnSettings === true || isClickingOnButton === false) {
      setDropDownButtonTarget(null);
      document.removeEventListener('click', clickOutsideStatusHandler);
    }
  }, [dropDownButtonTarget]);

  useEffect(() => {
    if (dropDownButtonTarget) {
      document.addEventListener('click', clickOutsideStatusHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideStatusHandler);
    };
  }, [dropDownButtonTarget]);

  return (
    <ul className={"user-settings " + classShow} ref={settingsContainerRef}>
      {Object.values(statusList)
        .map((status, index) => (
          <UserSettingsStatus
            key={index}
            data={{ status, handleModifyStatus }}
          />
        ))}
      <UserSettingsDisconnect setShowSettings={setShowSettings} />
      <UserSettingsModifyAvatar setShowSettings={setShowSettings} />
      <UserSettingsModifyPseudo setShowSettings={setShowSettings} />
    </ul>
  );
};

export default UserSettingsList;