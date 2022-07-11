const replaceUserInfosWithSelectedEmail = (targetEmail, storageData, formUpdate, setFormUpdate) => {
  const { stored } = storageData;

  let password = "";
  let autoAuth = false;
  let rememberPassword = false;
  if (storageData.current) {
    if (storageData.current.email === targetEmail && storageData.remember) {
      password = "*******************";
      autoAuth = true;
      rememberPassword = true;
    }
  }
  const findClickedEmailInfos = stored.find(({ email }) => email === targetEmail);
  const { status, avatar } = findClickedEmailInfos;

  setFormUpdate({
    ...formUpdate,
    email: targetEmail,
    status,
    avatar,
    rememberPassword,
    autoAuth,
    password,
    rememberEmail: true
  });
};

export default replaceUserInfosWithSelectedEmail;