// DATA
import statusList from '../../../../data/statusList';

const UserSettingsDisconnect = (props) => {

  const { setShowSettings } = props;

  const handleDisconnect = () => {
    console.log("disconnect");
    setShowSettings(false);
  };

  return (
    <li onClick={handleDisconnect}>
      <div className="status-img__container" data-setting="disconnect">
        <img className="notHover" src={statusList.appearOffline.icon} alt="status icon" />
        <img className="hover" src={statusList.appearOffline.inconHover} alt="status icon hovered" />
      </div>
      <span>Se déconnecter</span>
    </li>
  );
};

export default UserSettingsDisconnect;