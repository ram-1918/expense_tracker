import {Link} from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <p>PageNotFound</p>
            <p>Please login <Link to='/users/login'>here</Link></p>
        </>
    )
}

export default PageNotFound;