// Users
import HomePage from '../pages/Home';
import RegisterPage from '../Components/users/Register';
import LoginPage from '../Components/users/Login';
import ForgotPasswordPage from '../Components/users/ForgotPassword';
import PageNotFound from '../pages/PageNotFound';

// Expense app
import ExpenseHome from '../Components/features/Base';
import Dashboard from '../Components/features/Dashboard';
import MyExpenses from '../Components/features/MyExpenses';
import SubmitExpense from '../Components/features/SubmitExpense';
import MakeARequest from '../Components/features/MakeARequest';
import ExpenseForecast from '../Components/features/ExpenseForecast';

import UpdateProfile from '../Components/users/UpdateProfile';

import ViewUsers from '../Components/features/ViewUsers';
import ViewExpenses from '../Components/features/ViewExpenses';
import RegistrationRequests from '../Components/features/RegistrationRequests';
import ExpenseRequests from '../Components/features/ExpenseRequests';


// Builtin
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectActiveUserID, selectUserRole } from '../Components/users/store/slice';

// Private and public elements
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
  const userid = useSelector(selectActiveUserID);
  const userRole = useSelector(selectUserRole);
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
          <Route path='user/:userid/:role/:section' element={<PrivateRoute />}>
            <Route path="" element={<Navigate replace to={`/user/${userid}/${userRole}/1/1/Dashboard`} />}/>
            <Route path='' element={<ExpenseHome />}>

              <Route path=':mainsection/Dashboard' element={<Dashboard />}></Route>
              <Route path=':mainsection/submityourexpense' element={<SubmitExpense />}></Route>
              <Route path=':mainsection/makearequest' element={<MakeARequest />}></Route>
              <Route path=':mainsection/myexpenses' element={<MyExpenses />}></Route>
              <Route path=':mainsection/expenseforecast' element={<ExpenseForecast />}></Route>

              <Route path=':mainsection/viewusers' element={<ViewUsers />}></Route>
              <Route path=':mainsection/viewexpenses' element={<ViewExpenses />}></Route>
              <Route path=':mainsection/registrationrequests' element={<RegistrationRequests />}></Route>
              <Route path=':mainsection/expenserequests' element={<ExpenseRequests />}></Route>

              <Route path=':mainsection/updateprofile' element={<UpdateProfile />}></Route>
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    )
}

export default AllRoutes;








// // Users
// import HomePage from '../pages/Home';
// import RegisterPage from '../Components/users/Register';
// import LoginPage from '../Components/users/Login';
// import ForgotPasswordPage from '../Components/users/ForgotPassword';
// import PageNotFound from '../pages/PageNotFound';

// // Expense app
// import ExpenseHome from '../Components/features/Base';
// import Dashboard from '../Components/features/Dashboard';
// import MyExpenses from '../Components/features/MyExpenses';
// import SubmitExpense from '../Components/features/SubmitExpense';
// import MakeARequest from '../Components/features/MakeARequest';
// import ExpenseForecast from '../Components/features/ExpenseForecast';

// import UpdateProfile from '../Components/users/UpdateProfile';

// import ViewUsers from '../Components/features/ViewUsers';
// import ViewExpenses from '../Components/features/ViewExpenses';
// import RegistrationRequests from '../Components/features/RegistrationRequests';
// import ExpenseRequests from '../Components/features/ExpenseRequests';


// // Builtin
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { selectActiveUserID } from '../Components/users/store/slice';

// // Private and public elements
// import AdminRoute from './AdminRoute';
// import PublicRoute from './PublicRoute';
// import PrivateRoute from './PrivateRoute';

// const AllRoutes = () => {
//   const userid = useSelector(selectActiveUserID);
//     return (
//         <BrowserRouter future={{ v7_startTransition: true }}>
//         <Routes>

//           {/* Public routes : /users/ */}
//           <Route path='/' element={<PublicRoute />}>
//             <Route path='/' element={<Navigate replace to='users' />} />
//             <Route path="/users" element={<HomePage />}>
//               <Route path="/users" element={<Navigate replace to="/users/login" />}/>
//               <Route path="login" element={<LoginPage/>}/>
//               <Route path='register' element={<RegisterPage />}></Route>
//               <Route path='forgotpassword' element={<ForgotPasswordPage />}></Route>
//             </Route>
//           </Route>

//           {/* Private routes : /user/:userid/:section */}
//           <Route path='user' element={<PrivateRoute />}>
//             <Route path=":userid/:section" element={<Navigate replace to={`/user/${userid}/1/Dashboard`} />}/>
//             <Route path=':userid/:role/' element={<ExpenseHome />}>

//               <Route path='1/Dashboard' element={<Dashboard />}></Route>
//               <Route path='submityourexpense' element={<SubmitExpense />}></Route>
//               <Route path='makearequest' element={<MakeARequest />}></Route>
//               <Route path='myexpenses' element={<MyExpenses />}></Route>
//               <Route path='expenseforecast' element={<ExpenseForecast />}></Route>

//               <Route path='updateprofile' element={<UpdateProfile />}></Route>

//               <Route path='admin' element={<AdminRoute />}>
//                 <Route path='viewusers' element={<ViewUsers />}></Route>
//                 <Route path='viewexpenses' element={<ViewExpenses />}></Route>
//                 <Route path='registrationrequests' element={<RegistrationRequests />}></Route>
//                 <Route path='expenserequests' element={<ExpenseRequests />}></Route>
//               </Route>
//             </Route>
//           </Route>
//           <Route path='*' element={<PageNotFound />} />
//         </Routes>
//       </BrowserRouter>
//     )
// }

// export default AllRoutes;








