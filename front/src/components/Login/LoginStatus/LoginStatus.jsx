// HOOKS
import { useState, useContext } from 'react';
// COMPONENTS
import { LoginStatusList } from '../loginIndex';
// CONTEXT
import loginContext from '../../../contexts/LoginContext';
// DATA
import statusList from '../../../data/statusList';
// ICONS
import ArrowIcon from '../../../icons/dropDownArrow';
import { useEffect } from 'react';

const LoginStatus = () => {

  const { formUpdate, setFormUpdate } = useContext(loginContext);

  const [showStatusList, setShowStatusList] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleStatusList = ({ currentTarget }) => {
    setDropDownButtonTarget(currentTarget);
    setShowStatusList(previous => !previous);
  };

  return (
    <div className="status__container">
      <div className="status-title">Statut :</div>
      <button type="button" className={`status-select${showStatusList ? " border" : ""}`} onClick={handleStatusList}>
        {statusList[formUpdate.status].sentence}
        <div className='dropdown' id="dropDownStatus">
          < ArrowIcon />
        </div>
      </button>
      <LoginStatusList
        classShow={showStatusList ? "display-flex" : "display-none"}
        setShowStatusList={setShowStatusList}
        dropDownButtonTarget={dropDownButtonTarget}
        showStatusList={showStatusList}
      />
    </div>
  );

};

export default LoginStatus;