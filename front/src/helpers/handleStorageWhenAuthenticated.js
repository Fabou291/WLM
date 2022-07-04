const handleStorageWhenAuthenticated = (currentUser, remember) => {
  currentUser.lastConnection = Date.now();

  let users = null;
  const findUsersInStorage = localStorage.getItem("users");

  if (findUsersInStorage) {
    users = JSON.parse(findUsersInStorage);
    const { stored } = users;

    const currentUserIndexInStoredArray = stored.findIndex(user => user.id === currentUser.id);
    if (currentUserIndexInStoredArray !== -1) {
      stored.splice(currentUserIndexInStoredArray, 1);
    }
    stored.unshift(currentUser);
  }
  else {
    users = {
      stored: [currentUser]
    };
  }

  users.current = currentUser;
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("remember", JSON.stringify(remember));
};

export default handleStorageWhenAuthenticated;