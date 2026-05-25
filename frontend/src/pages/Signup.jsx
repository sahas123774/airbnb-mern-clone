import { useState } from 'react';

import axios from 'axios';

import {
  useNavigate
} from 'react-router-dom';

function Signup() {

  const navigate =
    useNavigate();

  // STATES
  const [name, setName]
    = useState('');

  const [email, setEmail]
    = useState('');

  const [password, setPassword]
    = useState('');

  const [role, setRole]
    = useState('user');

  // SIGNUP FUNCTION
  async function handleSignup(event){

    event.preventDefault();

    // VALIDATION
    if(
      !name ||
      !email ||
      !password
    ){

      alert(
        'Please Fill All Fields'
      );

      return;

    }

    try {

      const response =
        await axios.post(

          'http://localhost:5000/api/auth/signup',

          {

            name,

            email,

            password,

            role

          }

        );

      alert(
        response.data.message
      );

      // REDIRECT LOGIN
      navigate('/login');

    }

    catch(error){

      console.log(error);

      alert(

        error?.response?.data?.message
        || 'Signup Failed'

      );

    }

  }

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSignup}
      >

        <h1>Signup</h1>

        {/* NAME */}
        <input

          type="text"

          placeholder="Enter Name"

          value={name}

          onChange={(event) =>

            setName(
              event.target.value
            )

          }

        />

        {/* EMAIL */}
        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(event) =>

            setEmail(
              event.target.value
            )

          }

        />

        {/* PASSWORD */}
        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(event) =>

            setPassword(
              event.target.value
            )

          }

        />

        {/* ROLE */}
        <select

          value={role}

          onChange={(event) =>

            setRole(
              event.target.value
            )

          }

        >

          <option value="user">

            User

          </option>

          <option value="host">

            Host

          </option>

        </select>

        {/* BUTTON */}
        <button type="submit">

          Signup

        </button>

      </form>

    </div>

  );
}

export default Signup;