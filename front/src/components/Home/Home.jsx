// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../contexts/GlobalContext';

const Home = () => {
  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);

  return (
    <div>
      {userDataFromDb.email} is Connected 😎
    </div>
  );
};

export default Home;