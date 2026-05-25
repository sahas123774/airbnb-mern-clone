import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Link
} from 'react-router-dom';

function Home() {

  // STATE
  const [properties, setProperties]
    = useState([]);

  const [location, setLocation]
   = useState('');

const [minPrice, setMinPrice]
  = useState('');

const [maxPrice, setMaxPrice]
  = useState('');

  // FETCH PROPERTIES
  useEffect(() => {

    fetchProperties();

  }, []);

  // GET ALL PROPERTIES
  async function fetchProperties(){

  try {

    const response =
      await axios.get(

        'https://airbnb-backend-cpov.onrender.com/api/properties',

        {

          params: {

            location,

            minPrice,

            maxPrice

          }

        }

      );

    setProperties(
      response.data
    );

  }

  catch(error){

    console.log(error);

  }

}

  return (

    <div>

      <h1>
        Explore Properties
      </h1>

      <div className="search-bar">

  <input

    type="text"

    placeholder="Search Location"

    value={location}

    onChange={(event) =>

      setLocation(
        event.target.value
      )

    }

  />

  <input

    type="number"

    placeholder="Min Price"

    value={minPrice}

    onChange={(event) =>

      setMinPrice(
        event.target.value
      )

    }

  />

  <input

    type="number"

    placeholder="Max Price"

    value={maxPrice}

    onChange={(event) =>

      setMaxPrice(
        event.target.value
      )

    }

  />

  <button onClick={fetchProperties}>

    Search

  </button>

</div>

      <div className="property-grid">

        {
          properties.map((property) => (

            <Link

              to={`/property/${property._id}`}

              className="property-link"

              key={property._id}
            >

              <div className="property-card">

                <img
                  src={property.image}
                  alt={property.title}
                />

                <h2>
                  {property.title}
                </h2>

                <p>
                  {property.location}
                </p>

                <h3>
                  ₹ {property.price}
                </h3>

              </div>

            </Link>

          ))
        }

      </div>

    </div>

  );
}

export default Home;