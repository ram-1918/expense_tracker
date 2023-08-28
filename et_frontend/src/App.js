import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Components/User/Register';
import LoginPage from './Components/User/Login';
import ForgotPasswordPage from './Components/User/ForgotPassword';

import HomePage from './Home';


function App(){


  return (
    // <div className="h-screen">
    //   <HomePage />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/users' element={<HomePage />}>
          <Route path='register' element={<RegisterPage />}></Route>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='forgotpassword' element={<ForgotPasswordPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
