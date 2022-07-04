const handleStorageWhenAuthenticated = (currentUser, remember) => {
  localStorage.setItem("remember", JSON.stringify(remember));
  currentUser.lastConnection = Date.now();

  const findSavedUsers = localStorage.getItem("savedUsers");

  if (findSavedUsers) {
    const savedUsers = JSON.parse(findSavedUsers);
    savedUsers[currentUser.id] = currentUser;
    savedUsers.current = currentUser;
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  }
  else {
    const savedUsers = {
      current: currentUser,
      [currentUser.id]: currentUser
    };
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
  }
};

export default handleStorageWhenAuthenticated;