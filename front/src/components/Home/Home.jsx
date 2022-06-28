// HOOKS
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import globalContext from '../../contexts/GlobalContext';
// HELPERS
import { fetchUserInfos } from '../../helpers/fetch';

const Home = () => {
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataFromDb === null) {
      const getUserInfos = async () => {
        try {
          const userData = await fetchUserInfos();
          setUserDataFromDb(userData);
          console.log(userData);
        }
        catch (err) {
          console.log(err);
          navigate("/login");
        }
      };

      getUserInfos();
    }

  }, [userDataFromDb]);

  return (
    userDataFromDb && (
      <div>
        Connected 😎
      </div>
    )
  );
};

export default Home;