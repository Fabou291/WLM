// HOOKS
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
// COMPONENTS
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ResetPasswordAsk from './components/ResetPassword/AskResetPassword/AskResetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword/ResetPassword';
import Home from './components/Home/Home';
// CONTEXT
import globalContext from './contexts/GlobalContext';
// OUTLET
import PrivateRoutes from './PrivateRoutes';

const App = () => {

  const [userDataFromDb, setUserDataFromDb] = useState(null);

  return (
    <globalContext.Provider value={{ userDataFromDb, setUserDataFromDb }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes userDataFromDb={userDataFromDb} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset-password/demand' element={<ResetPasswordAsk />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </globalContext.Provider>
  );
};

export default App;
