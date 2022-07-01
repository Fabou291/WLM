import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import globalContext from './contexts/GlobalContext';
import ResetPasswordAsk from './components/ResetPassword/AskResetPassword/AskResetPassword';

function App() {

  const [userDataFromDb, setUserDataFromDb] = useState(null);

  return (
    <globalContext.Provider value={{ userDataFromDb, setUserDataFromDb }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset-password/demand' element={<ResetPasswordAsk />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </globalContext.Provider>
  );
}

export default App;
