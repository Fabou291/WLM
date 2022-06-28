import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../../contexts/GlobalContext';

const Home = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  const userInfosPath = "http://localhost:3333/api/auth/me";
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataFromDb === null) {
      const getUserInfos = async () => {
        const options = { credentials: "include" };

        try {
          const response = await fetch(userInfosPath, options);
          if (response.ok === false) {
            throw ("Non authentifié");
          }

          const userData = await response.json();
          setUserDataFromDb(userData);
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