
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchuserinfo, selectUserid, setUserInfo } from './features/users/usersSlice';
import MainRoutes from './routing/MainRoutes'; 
import { get_user_info } from './features/users/apicalls';
import axios from 'axios';
import { API_URL } from './store/constants';
import { fetchusers, listexpenses, fetchsummaries } from './features/core/state/coreThunks';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

// import { FetchData } from './components/customhooks/FetchData';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

function App() {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userid);
  const userinfo = useSelector((state) => state.user.userinfo);
  // let status = useSelector((state) => state.expense.status);

  useEffect(() => {
    // dispatch(fetchusers());
    // dispatch(listexpenses());
    dispatch(fetchuserinfo(userid));
    // dispatch(fetchsummaries());
  }, [dispatch])


  return (
      <MainRoutes />
  );
}

export default App;



// import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
// import Topnav from './features/core/Topnav';
// import { selectUserid, setUserInfo } from './features/users/usersSlice';
// import MainRoutes from './routing/MainRoutes'; 

// // import { FetchData } from './components/customhooks/FetchData';
// import { get_user_info } from './features/users/apicalls';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from './store/constants';

// const axiosInstance = axios.create({
//   withCredentials: true,
//   baseURL: API_URL
// });

// function App() {
//   const dispatch = useDispatch();
//   const userid = useSelector((state) => state.user.userid);
//   const url = get_user_info(userid);

//   useEffect(() => {
//     const fetchdata = async () => {
//       try{
//         const result = await axiosInstance.get(url);
//         console.log(result, result.data);
//         dispatch(setUserInfo(result.data));
//       }
//       catch(error){console.log(error)};
//     }
//     fetchdata();
//   }, []);

//   // FetchData(url);
//   const data = useSelector((state) => state.user.userinfo);
//   console.info(data, "USER INFO RETRIEVED!")
//   return (
//     <>
//       <MainRoutes />
//     </>
//   );
// }

// export default App;
