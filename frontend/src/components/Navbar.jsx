import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  useContext
} from 'react';

import {
  AuthContext
} from '../context/AuthContext';

function Navbar() {

  const navigate =
    useNavigate();

  const {
    token,
    logout
  } = useContext(AuthContext);

  const role=localStorage.getItem('role');

  function handleLogout(){

    logout();

    navigate('/login');

  }

  return (

    <nav className="navbar">

      <h2 className="logo">
        Airbnb
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {
          token ? (

            <>
              {
                role==='host' && (

              <Link to="/dashboard">
                Dashboard
              </Link>
                )

              }

              <Link to="/bookings">
                My Bookings
              </Link>
              {
                role==='host' && (
              <Link to="/add-property">
               Add Property
              </Link>
                )

              }

              <Link to="/favorites">

               Favorites

              </Link>

              <Link to="/ai-assistant">
               AI Assistant
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>

          )
        }

      </div>

    </nav>

  );
}

export default Navbar;