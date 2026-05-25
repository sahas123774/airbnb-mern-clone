import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

function EditProperty() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  // STATES
  const [title, setTitle]
    = useState('');

  const [location, setLocation]
    = useState('');

  const [price, setPrice]
    = useState('');

  const [image, setImage]
    = useState(null);

  const [currentImage, setCurrentImage]
    = useState('');

  // FETCH PROPERTY
  useEffect(() => {

    fetchProperty();

  }, []);

  async function fetchProperty(){

    try {

      const response =
        await axios.get(

          `http://localhost:5000/api/properties/${id}`

        );

      const property =
        response.data;

      // PREFILL DATA
      setTitle(property.title);

      setLocation(property.location);

      setPrice(property.price);

      setCurrentImage(
        property.image
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // UPDATE PROPERTY
  async function handleUpdate(event){

    event.preventDefault();

    try {

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

      // ONLY IF NEW IMAGE SELECTED
      if(image){

        formData.append(
          'image',
          image
        );

      }

      // API REQUEST
      const response =
        await axios.put(

          `http://localhost:5000/api/properties/${id}`,

          formData

        );

      alert(
        response.data.message
      );

      // REDIRECT DETAILS PAGE
      navigate(
        `/property/${id}`
      );

    }

    catch(error){

      console.log(error);

      alert(
        'Error Updating Property'
      );

    }

  }

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleUpdate}
      >

        <h1>Edit Property</h1>

        {/* CURRENT IMAGE */}
        <img

          src={currentImage}

          alt="Property"

          className="preview-image"

        />

        {/* TITLE */}
        <input
          type="text"

          placeholder="Title"

          value={title}

          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        {/* LOCATION */}
        <input
          type="text"

          placeholder="Location"

          value={location}

          onChange={(event) =>
            setLocation(event.target.value)
          }
        />

        {/* PRICE */}
        <input
          type="number"

          placeholder="Price"

          value={price}

          onChange={(event) =>
            setPrice(event.target.value)
          }
        />

        {/* IMAGE */}
        <input

          type="file"

          onChange={(event) =>

            setImage(
              event.target.files[0]
            )

          }

        />

        {/* BUTTON */}
        <button type="submit">

          Update Property

        </button>

      </form>

    </div>

  );
}

export default EditProperty;