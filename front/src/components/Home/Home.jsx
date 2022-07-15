// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from './User/User';

const Home = () => {
  return (
    <div className="home__container">
      <div className="home">
        <User />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;