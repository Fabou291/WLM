import React from 'react';

const UserSettingsStatus = (props) => {

  const { status, handleModifyStatus } = props.data;

  return (
    <li onClick={handleModifyStatus} data-status={status.key}>
      <div className="status-img__container">
        <img className="notHover" src={status.icon} alt="status icon" />
        <img className="hover" src={status.inconHover} alt="status icon hovered" />
      </div>
      <span>{status.sentence}</span>
    </li>
  );
};

export default UserSettingsStatus;