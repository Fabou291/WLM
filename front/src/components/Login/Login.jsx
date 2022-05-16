import {
  LoginAuth,
  LoginAutoContainer,
  LoginImage,
  LoginRemember,
  LoginStatus,
  LoginSubmit
} from './loginIndex';


const Login = () => {
  return (
    <div className="login__container">
      <form className="login__container__form">
        <LoginImage />
        <LoginAuth />
        <LoginStatus />
        <LoginRemember />
        <LoginAutoContainer />
        <LoginSubmit />
      </form>
    </div>

  );
};

export default Login;