// Builtin
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UsersHome from '../features/users/UsersHome';
import Login from '../features/users/Login';
import Register from '../features/users/Register';


import CoreHome from '../features/core/CoreHome';
import FormLayout from '../containers/forms/FormLayout';
import UpdateUserForm from '../containers/forms/UpdateUserForm';
import Dashboard from '../features/core/Dashboard';
import ContentLayout from '../containers/content/ContentLayout';
import RequestsLayout from '../containers/requests/RequestsLayout';



import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import PageNotFound from '../pages/PageNotFound';
import { selectUserid } from '../features/users/usersSlice';
import { useSelector } from 'react-redux';
import ViewExpenseForm from '../containers/forms/ViewExpenseForm';
import ViewUserProfile from '../containers/forms/ViewUserProfile';


const MainRoutes = () => {
  const userid = useSelector(selectUserid);
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PublicRoute />} >
              <Route path='/' element={<Navigate replace to='/users/login'/>} />
              <Route path='/users' element={<UsersHome />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
            </Route>
            <Route path='/user/:userid/home/' element={<PrivateRoute />} >
              <Route path='/user/:userid/home/' element={<CoreHome />}>
                <Route index element={<Navigate replace to={`/user/${userid}/home/dashboard`} /> } />
                <Route path='dashboard' element={<Dashboard />} > 
                  <Route path='submit/:formtype' element={<FormLayout />} />
                  <Route path='viewprofile/:curruser' element={<ViewUserProfile />} />
                </Route>
                <Route path='manage/:type/' element={<ContentLayout />}>
                  <Route path='submit/:formtype' element={<FormLayout />} />
                  <Route path='updateuser/:userid' element={<UpdateUserForm />} />
                  <Route path='viewexpense/:expenseid' element={<ViewExpenseForm />} />
                  <Route path='viewprofile/:curruser' element={<ViewUserProfile />} />
                </Route>
                <Route path='requests/:type/' element={<RequestsLayout />} >
                  <Route path='viewexpense/:expenseid' element={<ViewExpenseForm />} />
                </Route>
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes;



{/* <BrowserRouter>
<Routes>
  <Route path='/' element={<Navigate replace to='/users/login'/>} />
  <Route path='/users' element={<Home />}>
    <Route path='login/' element={<Login />} />
    <Route path='register/' element={<Register />} />
  </Route>
  <Route path='/user/dashboard' element={<XHome />}>
    <Route path='' element={<Navigate replace to='/user/dashboard/home'/>} />
    <Route path='home/' element={<Dashboard />}></Route>
    <Route path='manage/:type' element={<BaseDisplay />} />
    <Route path='submit/:formtype' element={<BaseForm />} />
  </Route>
  <Route path='*' element={<PageNotFound />} />
</Routes>
</BrowserRouter> */}




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








