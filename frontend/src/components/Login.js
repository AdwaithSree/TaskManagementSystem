import React, {
  useState,
} from 'react';

import axios from 'axios';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import {
  toast,
} from 'react-toastify';


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');


  /* LOGIN */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        {
          username,
          password,
        }
      );


      localStorage.setItem(
        'token',
        response.data.access
      );


      toast.success('Login Successful');

      navigate('/dashboard');

    }

    catch (error) {

      console.log(error);

      toast.error(
        'Invalid username or password'
      );

    }

  };


  return (

    <div className="auth-wrapper">

      <div className="auth-card">

        {/* TITLE */}

        <div className="auth-title">

          Welcome Back

        </div>


        <div className="auth-subtitle">

          Login to continue your workflow.

        </div>


        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* USERNAME */}

          <div className="input-group">

            <label className="input-label">

              Username

            </label>

            <input
              type="text"
              className="input-field"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label className="input-label">

              Password

            </label>

            <input
              type="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="primary-btn"
            style={{
              width:'100%',
              marginTop:'10px',
              height:'58px',
            }}
          >

            Login

          </button>

        </form>


        {/* REGISTER */}

        <div
          style={{
            marginTop:'28px',
            textAlign:'center',
            color:'#9ca3af',
          }}
        >

          Don’t have an account?{' '}

          <Link
            to="/register"
            style={{
              color:'#6d5dfc',
              textDecoration:'none',
              fontWeight:'600',
            }}
          >

            Register

          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;