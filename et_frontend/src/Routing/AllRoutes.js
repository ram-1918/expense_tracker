// Users
import HomePage from '../Components/User/Home';
import RegisterPage from '../Components/User/Register';
import LoginPage from '../Components/User/Login';
import ForgotPasswordPage from '../Components/User/ForgotPassword';
import PageNotFound from '../Components/PageNotFound';

// Expense app
import ExpenseHome from '../Components/Expenses/ExpenseHome';
import Dashboard from '../Components/Expenses/sections/Dashboard';
import ViewUsers from '../Components/Expenses/sections/ViewUsers';
import ViewRequests from '../Components/Expenses/sections/ViewRequests';
import MyExpenses from '../Components/Expenses/sections/MyExpenses';
import SubmitExpense from '../Components/Expenses/sections/SubmitExpense';
import MakeARequest from '../Components/Expenses/sections/MakeARequest';
import ExpenseForecast from '../Components/Expenses/sections/ExpenseForecast';
import CreditLineIncrease from '../Components/Expenses/sections/CreditLineIncrease';
import UpdateProfile from '../Components/Expenses/sections/UpdateProfile';
import ExpenseRequests from '../Components/Expenses/sections/ExpenseRequests';

// Builtin
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../Components/User/store/slice';

// Private and public elements
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
  const userid = useSelector(selectActiveUserID);
    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>

          {/* Public routes : /users/ */}
          <Route path='/' element={<PublicRoute />}>
            <Route path='/' element={<Navigate replace to='users' />} />
            <Route path="/users" element={<HomePage />}>
              <Route path="/users" element={<Navigate replace to="/users/login" />}/>
              <Route path="login" element={<LoginPage/>}/>
              <Route path='register' element={<RegisterPage />}></Route>
              <Route path='forgotpassword' element={<ForgotPasswordPage />}></Route>
            </Route>
          </Route>

          {/* Private routes : /user/:userid/:section */}
          <Route path='user' element={<PrivateRoute />}>
            <Route path=":userid/:section" element={<Navigate replace to={`/user/${userid}/1/Dashboard`} />}/>
            <Route path=':userid/:section' element={<ExpenseHome />}>
              <Route path='Dashboard' element={<Dashboard />}></Route>
              <Route path='viewusers' element={<ViewUsers />}></Route>
              <Route path='submityourexpense' element={<SubmitExpense />}></Route>
              <Route path='makearequest' element={<MakeARequest />}></Route>
              <Route path='viewrequests' element={<ViewRequests />}></Route>
              <Route path='myexpenses' element={<MyExpenses />}></Route>
              <Route path='expenseforecast' element={<ExpenseForecast />}></Route>
              <Route path='updateprofile' element={<UpdateProfile />}></Route>
              <Route path='creditlineincrease' element={<CreditLineIncrease />}></Route>
              <Route path='expenserequests' element={<ExpenseRequests />}></Route>
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    )
}

export default AllRoutes;