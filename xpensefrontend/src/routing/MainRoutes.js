// Builtin
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from '../pages/Home';
import Login from '../components/home/Login';

import XHome from '../pages/Xhome';
import Dashboard from '../components/xpenses/Dashboard';
import BaseDisplay from '../components/base/BaseDisplay';

import PageNotFound from '../pages/PageNotFound';
import AddExpense from '../components/xpenses/AddExpense';


// import PublicRoute from './PublicRoute';
// import PrivateRoute from './PrivateRoute';

const MainRoutes = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to='/users/login/login'/>} />
            <Route path='/users' element={<Home />}>
              <Route path='login/:type' element={<Login />} />
            </Route>
            <Route path='/user/dashboard' element={<XHome />}>
              <Route path='' element={<Navigate replace to='/user/dashboard/home'/>} />
              <Route path='home/' element={<Dashboard />}></Route>
              <Route path='manage/:type' element={<BaseDisplay />} />
              <Route path='addexpense' element={<AddExpense />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes;








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








