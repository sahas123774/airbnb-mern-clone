import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

function Bookings() {

  const [bookings, setBookings]
    = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  async function fetchBookings(){

    try {

      const userId =
        localStorage.getItem(
          'userId'
        );

      const response =
        await axios.get(

          `http://localhost:5000/api/bookings/${userId}`

        );

      setBookings(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  async function cancelBooking(id){

  try {

    await axios.delete(

      `http://localhost:5000/api/bookings/${id}`

    );

    alert(
      'Booking Cancelled'
    );

    fetchBookings();

  }

  catch(error){

    console.log(error);

    alert(
      'Error Cancelling Booking'
    );

  }

  }

  return (

    <div>

      <h1>My Bookings</h1>

      <div className="property-grid">

        {
          bookings.map((booking) => (

            <div
              className="property-card"

              key={booking._id}
            >

              <img
                src={
                  booking.property.image
                }

                alt={
                  booking.property.title
                }
              />

              <h2>
                {
                  booking.property.title
                }
              </h2>

              <p>

                Check In:
                {new Date(

                  booking.checkIn

                ).toDateString()}

              </p>

              <p>

                Check Out:
                {new Date(

                  booking.checkOut

                ).toDateString()}

              </p>

              <h3>

                Total:
                 ₹ {booking.totalPrice}

              </h3>

              <button

               className="delete-btn"

               onClick={() =>

               cancelBooking(
               booking._id
               )

              }

              >

                Cancel Booking

              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Bookings;