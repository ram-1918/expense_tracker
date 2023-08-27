// function RegisterPage(){
//     return (
//     <div>
//         <p>Register Page</p>
//     </div>
//     )
// }

// export default RegisterPage;

// UserDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
    // const user = useSelector((state) => state.user.user.name)
    const value = useSelector((state) => state.user.value)

  return (
    <div>
      <h2>User Dashboard</h2>
    value: {value}
    </div>
  );
};


export default UserDashboard;
