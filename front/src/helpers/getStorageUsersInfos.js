const getStorageUsersInfos = () => {
  const findStorageUsers = localStorage.getItem("users");

  if (findStorageUsers === null) {
    return null;
  }

  return JSON.parse(findStorageUsers);
};

export default getStorageUsersInfos;