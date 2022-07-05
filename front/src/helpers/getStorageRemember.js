const getStorageRemember = () => {
  const findStorageRemember = localStorage.getItem("remember");

  if (findStorageRemember === null) {
    return false;
  }

  return JSON.parse(findStorageRemember);
};

export default getStorageRemember;