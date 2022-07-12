// HOOKS
import { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// COMPONENTS
import Loader from './components/Loader';
// CONTEXT
import globalContext from './contexts/GlobalContext';
// HELPERS
import { fetchMe } from './helpers/fetch';

const PrivateRoutes = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  const [userAuthenticated, setUserAuthenticated] = useState("pending");

  useEffect(() => {
    if (userDataFromDb === null) {
      const getUserInfos = async () => {
        try {
          const userData = await fetchMe();
          setUserDataFromDb(userData);
        }
        catch (err) {
          console.log(err);
          setUserAuthenticated(false);
        }
      };

      getUserInfos();
    }

    if (userDataFromDb) {
      setUserAuthenticated(true);
    }

  }, [userDataFromDb]);

  return (
    userAuthenticated === "pending"
      ? <Loader />
      : userAuthenticated === true
        ? <Outlet />
        : <Navigate to="/login" />
  );
};

export default PrivateRoutes;