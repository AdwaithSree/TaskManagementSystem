import React from 'react';

import {
  useNavigate,
  useLocation,
} from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();


  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/');

  };


  return (

    <div className="navbar">

      {/* LOGO */}

      <div className="logo">

        TaskFlow

      </div>


      {/* RIGHT SIDE */}

      <div className="nav-right">

        {
          location.pathname === '/dashboard'
          &&
          (
            <button
              className="primary-btn"
              onClick={() =>
                navigate('/create-task')
              }
            >

              New Task

            </button>
          )
        }


        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </div>

  );
}

export default Navbar;