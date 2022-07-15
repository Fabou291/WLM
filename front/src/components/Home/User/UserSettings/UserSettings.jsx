// COMPONENTS
import { UserSettingsModifyAvatar, UserSettingsModifyPseudo, UserSettingsStatus } from "../userIndex";

const UserSettings = () => {
  return (
    <>
      <UserSettingsModifyAvatar />
      <UserSettingsModifyPseudo />
      <UserSettingsStatus />
    </>
  );
};

export default UserSettings;