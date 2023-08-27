// login.js
import { useSelector, useDispatch } from 'react-redux';
import {setUser, setUserStatus, selectUserId, selectIsLoggedIn} from './store/slice';

function LoginPage(){
    const dispatch = useDispatch();
    const userid = useSelector(selectUserId);
    const isLogged = useSelector(selectIsLoggedIn);
    const handleSubmit = () => {
        dispatch(setUser({id: 123, name: "ram"}));
        dispatch(setUserStatus(true));
        console.log(userid, isLogged)
    }
    return (
            <>
                <div>
                    <p>Login Page</p>
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </>
        )
    }

export default LoginPage;