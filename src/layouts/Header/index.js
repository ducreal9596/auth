import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUser, logout } from '../../until/apiRequestLogin';

const Header = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  // automatically authenticate user if token is found
  //   useEffect(() => {
  //     if (user) {
  //       dispatch(getAllUser());
  //     }
  //   }, [user, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>{user ? `Logged in as ${user.data.nickname}` : "You're not logged in"}</span>
        <div className="cta">
          {user ? (
            <button className="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="container navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/user-profile">Profile</NavLink>
      </nav>
    </header>
  );
};
export default Header;
