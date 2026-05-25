import { useState } from 'react';

import axios from 'axios';

import {
  useNavigate
} from 'react-router-dom';

function AddProperty() {

  const navigate =
    useNavigate();

  // STATES
  const [title, setTitle]
    = useState('');

  const [location, setLocation]
    = useState('');

  const [price, setPrice]
    = useState('');

  const [image, setImage]
    = useState(null);

  // SUBMIT FUNCTION
  async function handleSubmit(event){

    event.preventDefault();

    // VALIDATION
    if(
      !title ||
      !location ||
      !price ||
      !image
    ){

      alert(
        'Please Fill All Fields'
      );

      return;

    }

    try {

      // GET HOST ID
      const host =
        localStorage.getItem(
          'userId'
        );

      // FORMDATA
      const formData =
        new FormData();

      formData.append(
        'title',
        title
      );

      formData.append(
        'location',
        location
      );

      formData.append(
        'price',
        price
      );

      formData.append(
        'image',
        image
      );

      // HOST ID
      formData.append(
        'host',
        host
      );

      // API REQUEST
      const response =
        await axios.post(

          'http://localhost:5000/api/properties',

          formData

        );

      alert(
        response.data.message
      );

      // REDIRECT HOME
      navigate('/');

    }

    catch(error){

      console.log(error);

      alert(

        error?.response?.data?.message
        || 'Error Adding Property'

      );

    }

  }

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Add Property</h1>

        {/* TITLE */}
        <input

          type="text"

          placeholder="Property Title"

          value={title}

          onChange={(event) =>

            setTitle(
              event.target.value
            )

          }

        />

        {/* LOCATION */}
        <input

          type="text"

          placeholder="Location"

          value={location}

          onChange={(event) =>

            setLocation(
              event.target.value
            )

          }

        />

        {/* PRICE */}
        <input

          type="number"

          placeholder="Price"

          value={price}

          onChange={(event) =>

            setPrice(
              event.target.value
            )

          }

        />

        {/* IMAGE */}
        <input

          type="file"

          accept="image/*"

          onChange={(event) =>

            setImage(
              event.target.files[0]
            )

          }

        />

        {/* BUTTON */}
        <button type="submit">

          Add Property

        </button>

      </form>

    </div>

  );
}

export default AddProperty;