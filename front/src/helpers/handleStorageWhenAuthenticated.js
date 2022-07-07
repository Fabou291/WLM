const getStoredUsers = () => {
  const findUsersInStorage = localStorage.getItem("users");

  if (findUsersInStorage) {
    return JSON.parse(findUsersInStorage);
  }

  return {
    stored: [],
    current: null
  };
};

const handleStorageWhenAuthenticated = (currentUser, autoAuth, rememberEmail) => {
  currentUser.lastConnection = Date.now();

  console.log({ currentUser, autoAuth, rememberEmail });

  let users = getStoredUsers();

  console.log(users);

  if (autoAuth === false) {
    users.current = null;
  }

  if (rememberEmail === false) {
    users.stored = users.stored.filter(user => user.id !== currentUser.id);
  }

  if (rememberEmail === true) {
    const currentUserIndexInStored = users.stored.findIndex(user => user.id === currentUser.id);
    console.log({ currentUserIndexInStored });
    if (currentUserIndexInStored !== -1) {
      users.stored.splice(currentUserIndexInStored, 1);
    }

    users.stored.unshift(currentUser);

    if (autoAuth) {
      users.current = currentUser;
    }
  }

  console.log({ users });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("remember", JSON.stringify(autoAuth));
};

export default handleStorageWhenAuthenticated;