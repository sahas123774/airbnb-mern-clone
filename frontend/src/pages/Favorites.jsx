import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

function Favorites() {

  const [favorites, setFavorites]
    = useState([]);

  useEffect(() => {

    fetchFavorites();

  }, []);

  async function fetchFavorites(){

    try {

      const userId =
        localStorage.getItem(
          'userId'
        );

      const response =
        await axios.get(

          `http://localhost:5000/api/favorites/${userId}`

        );

      setFavorites(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // REMOVE FAVORITE
  async function removeFavorite(id){

    try {

      await axios.delete(

        `http://localhost:5000/api/favorites/${id}`

      );

      alert(
        'Removed From Favorites'
      );

      fetchFavorites();

    }

    catch(error){

      console.log(error);

    }

  }

  return (

    <div>

      <h1>My Favorites</h1>

      <div className="property-grid">

        {
          favorites.map((favorite) => (

            <div

              className="property-card"

              key={favorite._id}

            >

              <img
                src={
                  favorite.property.image
                }

                alt={
                  favorite.property.title
                }
              />

              <h2>
                {
                  favorite.property.title
                }
              </h2>

              <p>
                {
                  favorite.property.location
                }
              </p>

              <h3>

                ₹
                {
                  favorite.property.price
                }

              </h3>

              <button

                className="delete-btn"

                onClick={() =>

                  removeFavorite(
                    favorite._id
                  )

                }

              >

                Remove Favorite

              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Favorites;