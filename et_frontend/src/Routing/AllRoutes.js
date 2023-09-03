// Users
import HomePage from '../pages/Home';
import RegisterPage from '../Components/users/Register';
import LoginPage from '../Components/users/Login';
import ForgotPasswordPage from '../Components/users/ForgotPassword';
import PageNotFound from '../pages/PageNotFound';

// Expense app
import ExpenseHome from '../Components/features/Base';
import Dashboard from '../Components/features/Dashboard';
import ViewUsers from '../Components/features/ViewUsers';
import ViewRequests from '../Components/features/ViewRequests';
import MyExpenses from '../Components/features/MyExpenses';
import SubmitExpense from '../Components/features/SubmitExpense';
import MakeARequest from '../Components/features/MakeARequest';
import ExpenseForecast from '../Components/features/ExpenseForecast';
import CreditLineIncrease from '../Components/features/CreditLineIncrease';
import UpdateProfile from '../Components/users/UpdateProfile';
import ExpenseRequests from '../Components/features/ExpenseRequests';

// Builtin
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../Components/users/store/slice';

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