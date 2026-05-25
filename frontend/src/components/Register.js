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


function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');


  /* REGISTER */

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/register/',
        {
          username,
          email,
          password,
        }
      );

      toast.success(
        'Registration Successful'
      );

      navigate('/');

    }

    catch (error) {

      console.log(error.response);

      toast.error('Registration Failed');

    }

  };


  return (

    <div className="auth-wrapper">

      <div className="auth-card">

        {/* TITLE */}

        <div className="auth-title">

          Create Account

        </div>


        <div className="auth-subtitle">

          Create your professional workspace.

        </div>


        {/* FORM */}

        <form onSubmit={handleRegister}>

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


          {/* EMAIL */}

          <div className="input-group">

            <label className="input-label">

              Email

            </label>

            <input
              type="email"
              className="input-field"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
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
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="primary-btn"
            style={{
              width:'100%',
              marginTop:'10px',
              height:'58px',
            }}
          >

            Register

          </button>

        </form>


        {/* LOGIN */}

        <div
          style={{
            marginTop:'28px',
            textAlign:'center',
            color:'#9ca3af',
          }}
        >

          Already have an account?{' '}

          <Link
            to="/"
            style={{
              color:'#6d5dfc',
              textDecoration:'none',
              fontWeight:'600',
            }}
          >

            Login

          </Link>

        </div>

      </div>

    </div>

  );
}

export default Register;