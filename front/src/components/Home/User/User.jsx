// COMPONENTS
import {
  UserSettings,
  UserAvatar,
  UserPersonalMessage
} from "./userIndex";

const User = () => {
  return (
    <div className="user__container">
      <UserAvatar />
      <UserSettings />
      <UserPersonalMessage />
    </div>
  );
};

export default User;