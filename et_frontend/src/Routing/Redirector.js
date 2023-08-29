import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";

const Redirector = ({route}) => {
    alert('redirector');
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to={route} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Redirector;