const getStorageUsersInfos = () => {
  const findStorageUsers = localStorage.getItem("users");

  if (findStorageUsers === null) {
    return {
      stored: [],
      current: null
    };
  }

  return JSON.parse(findStorageUsers);
};

export default getStorageUsersInfos;