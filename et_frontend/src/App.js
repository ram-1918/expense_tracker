import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCompany, setEmployeeid, setUsername, setUserRole } from './Components/User/store/slice';
import AllRoutes from './Routing/AllRoutes';
import { API_URL } from './store/constants';

function App(){
  const dispatch = useDispatch();
  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem('id', null));
    console.log(userid, 'Pub')
    if (userid){
      axios.get(`${API_URL}/users/register/${userid}`)
      .then((response) => {
        const {fullname, employee_id, company_id, role } = response.data;
        console.log(fullname, employee_id, company_id, role, 'APP');
        dispatch(setUsername(fullname));
        dispatch(setCompany(company_id));
        dispatch(setUserRole(role));
        dispatch(setEmployeeid(employee_id));
      })
      .catch((error) => {
        console.log(error.response);
      })
    }
  })
  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
