import { useState, useContext } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';

function Login() {

  // NAVIGATION
  const navigate = useNavigate();

  // CONTEXT
  const { login } =
    useContext(AuthContext);

  // STATES
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  // LOGIN FUNCTION
  async function handleLogin(event){

    event.preventDefault();

    try {

      const response =
        await axios.post(

          'http://localhost:5000/api/auth/login',

          {
            email,
            password
          }

        );

      // SAVE TOKEN USING CONTEXT
      login(response.data.token);

      localStorage.setItem(

        'userId',

        response.data.userId

      );

      localStorage.setItem(
        'role',

        response.data.role
      )


      alert('Login Successful');

      // REDIRECT HOME
      navigate('/');

    }

    catch(error){

     console.log(error);

    alert(
    error?.response?.data?.message
    || 'Login Failed'
     );

    }

  }

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h1>Login</h1>

        {/* EMAIL INPUT */}
        <input
          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        {/* SUBMIT BUTTON */}
        <button type="submit">

          Login

        </button>

      </form>

    </div>

  );
}

export default Login;