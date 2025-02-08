import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;