import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Link
} from 'react-router-dom';

function Dashboard() {

  const [properties, setProperties]
    = useState([]);

  const [totalEarnings,
    setTotalEarnings]
      = useState(0);
  
  const [totalBookings,
    setTotalBookings]
      = useState(0);

  useEffect(() => {

    fetchHostProperties();

  }, []);

  async function fetchHostProperties(){

    try {

      const hostId =
        localStorage.getItem(
          'userId'
        );

      const response =
        await axios.get(

          `https://airbnb-backend-cpov.onrender.com/api/properties/host/${hostId}`

        );

      setProperties(
        response.data
      );

      calculateEarnings(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // CALCULATE EARNINGS
  async function calculateEarnings(properties){

    try {

      let total = 0;

      let bookingcount=0;

      for(let property of properties){

        const response =
          await axios.get(

            `https://airbnb-backend-cpov.onrender.com/api/bookings/property/${property._id}`

          );

        response.data.forEach(

          (booking) => {

            total +=
              booking.totalPrice;

            bookingcount++;

          }

        );

      }

      setTotalEarnings(total);

      setTotalBookings(bookingcount);

    }

    catch(error){

      console.log(error);

    }

  }

  return (

    <div className="dashboard-page">

      <h1>

        Host Dashboard

      </h1>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-card">

          <h2>
            Total Properties
          </h2>

          <h3>
            {properties.length}
          </h3>

        </div>

        <div className="stat-card">

          <h2>
            Total Earnings
          </h2>

          <h3>
            ₹ {totalEarnings}
          </h3>

          <h2>
            Total Bookings
          </h2>

          <h3>
            ₹ {totalBookings}
          </h3>

        </div>

      </div>

      {/* HOST PROPERTIES */}
      <div className="property-grid">

        {
          properties.map((property) => (

            <div

              className="property-card"

              key={property._id}

            >

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

              <Link
                to={`/property/${property._id}`}
              >

                <button>

                  View Property

                </button>

              </Link>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Dashboard;