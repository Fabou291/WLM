// COMPONENTS
import Contacts from "./Contacts/Contacts";
import User from "./User/User";

import HeaderWithLogo from "../HeaderWithLogo";

const Home = () => {
  return (
    <div className="home__container">
      <div className="home">
        <HeaderWithLogo />
        <User />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;