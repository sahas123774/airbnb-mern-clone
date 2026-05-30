import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

function PropertyDetails() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  // CURRENT USER
  const userId =
    localStorage.getItem(
      'userId'
    );

  // PROPERTY STATE
  const [property, setProperty]
    = useState(null);

  // BOOKING STATES
  const [checkIn, setCheckIn]
    = useState('');

  const [checkOut, setCheckOut]
    = useState('');

  // REVIEW STATES
  const [reviews, setReviews]
    = useState([]);

  const [rating, setRating]
    = useState(1);

  const [comment, setComment]
    = useState('');

  const [averageRating,
    setAverageRating]

      = useState(0);

  // BOOKED DATES
  const [bookedDates,
    setBookedDates]

      = useState([]);

  // PAYMENT MODAL
  const [showPayment,
    setShowPayment]

      = useState(false);

  // FETCH PROPERTY + REVIEWS + BOOKINGS
  useEffect(() => {

    fetchProperty();

    fetchReviews();

    fetchBookings();

  }, []);

  // FETCH PROPERTY
  async function fetchProperty(){

    try {

      const response =
        await axios.get(

          `https://airbnb-backend-cpov.onrender.com/api/properties/${id}`

        );

      setProperty(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // FETCH REVIEWS
  async function fetchReviews(){

    try {

      const response =
        await axios.get(

          `https://airbnb-backend-cpov.onrender.com/api/reviews/${id}`

        );

      setReviews(
        response.data
      );

      calculateAverage(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // FETCH BOOKINGS
  async function fetchBookings(){

    try {

      const response =
        await axios.get(

          `https://airbnb-backend-cpov.onrender.com/api/bookings/property/${id}`

        );

      setBookedDates(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  }

  // CALCULATE AVERAGE RATING
  function calculateAverage(reviews){

    if(reviews.length === 0){

      setAverageRating(0);

      return;

    }

    let total = 0;

    reviews.forEach((review) => {

      total += review.rating;

    });

    const average =
      total / reviews.length;

    setAverageRating(
      average.toFixed(1)
    );

  }

  // DELETE PROPERTY
  async function handleDelete(){

    try {

      await axios.delete(

        `https://airbnb-backend-cpov.onrender.com/api/properties/${property._id}`

      );

      alert(
        'Property Deleted'
      );

      navigate('/');

    }

    catch(error){

      console.log(error);

    }

  }

  // BOOK PROPERTY
  async function handleBooking(){

    // EMPTY DATE VALIDATION
    if(!checkIn || !checkOut){

      alert(
        'Please Select Dates'
      );

      return;

    }

    // CHECKOUT VALIDATION
    if(checkOut <= checkIn){

      alert(

        'Check Out date must be after Check In date'

      );

      return;

    }

    // OVERLAP VALIDATION
    const alreadyBooked =
      bookedDates.some((booking) => {

        return (

          checkIn < booking.checkOut
          &&

          checkOut > booking.checkIn

        );

      });

    if(alreadyBooked){

      alert(

        'Selected dates are unavailable'

      );

      return;

    }

    // OPEN PAYMENT MODAL
    setShowPayment(true);

  }

  // PAYMENT SUCCESS
  async function handlePaymentSuccess(){

    try {

      const response =
        await axios.post(

          'http://localhost:5000/api/bookings',

          {

            user: userId,

            property: property._id,

            checkIn,

            checkOut,

            totalPrice

          }

        );

      alert(

        'Payment Successful & Booking Confirmed'

      );

      // CLOSE MODAL
      setShowPayment(false);

      // REFRESH BOOKINGS
      fetchBookings();

      // REDIRECT
      navigate('/bookings');

    }

    catch(error){

      console.log(error);

      alert(
        'Booking Failed'
      );

    }

  }

  // ADD TO FAVORITES
  async function handleFavorite(){

    try {

      const response =
        await axios.post(

          'http://localhost:5000/api/favorites',

          {

            user: userId,

            property: property._id

          }

        );

      alert(
        response.data.message
      );

    }

    catch(error){

      console.log(error);

      alert(

        error?.response?.data?.message
        || 'Error Adding Favorite'

      );

    }

  }

  // ADD REVIEW
  async function handleReview(){

    try {

      const response =
        await axios.post(

          'http://localhost:5000/api/reviews',

          {

            user: userId,

            property: property._id,

            rating,

            comment

          }

        );

      alert(
        response.data.message
      );

      // REFRESH REVIEWS
      fetchReviews();

      // CLEAR FORM
      setRating(1);

      setComment('');

    }

    catch(error){

      console.log(error);

      alert(
        'Error Adding Review'
      );

    }

  }

  // LOADING
  if(!property){

    return <h1>Loading...</h1>;

  }

  const nights =
  Math.ceil(
    (new Date(checkOut) - new Date(checkIn))
    / (1000 * 60 * 60 * 24)
  ) || 0;

  const totalPrice =
    nights * property.price;

  return (

    <div className="details-page">

      {/* IMAGE */}
      <img
        src={property.image}
        alt={property.title}
      />

      {/* DETAILS */}
      <h1>
        {property.title}
      </h1>

      <p>
        {property.location}
      </p>

      <h2>
        ₹ {property.price}
      </h2>

      {/* AVERAGE RATING */}
      <h3>

        ⭐ {averageRating}

      </h3>

      {/* BOOKING FORM */}
      <div className="booking-form">

        {/* CHECK IN */}
        <input

          type="date"

          min={new Date()
            .toISOString()
            .split('T')[0]}

          value={checkIn}

          onChange={(event) =>

            setCheckIn(
              event.target.value
            )

          }

        />

        {/* CHECK OUT */}
        <input

          type="date"

          min={checkIn}

          value={checkOut}

          onChange={(event) =>

            setCheckOut(
              event.target.value
            )

          }

        />

        {/* BOOK BUTTON */}
        <button onClick={handleBooking}>

          Book Now

        </button>

      </div>

      {/* PAYMENT MODAL */}
      {

        showPayment && (

          <div className="payment-modal">

            <div className="payment-box">

              <h2>

                Complete Payment

              </h2>

              <p>

                Property:
                  {property.title}
 
              </p>

              <p>

                Check In:
                 {checkIn}

              </p>

              <p>

                Check Out:
                 {checkOut}

              </p>

              <h3>

                Total Amount:
                 ₹ {totalPrice}

              </h3>

              <p>

               Nights: {nights}

               </p>

              <button
                onClick={
                  handlePaymentSuccess
                }
              >

                Pay Now

              </button>

              <button
                onClick={() =>

                  setShowPayment(false)

                }
              >

                Cancel

              </button>

            </div>

          </div>

        )

      }

      {/* UNAVAILABLE DATES */}
      <div className="booked-dates">

        <h2>
          Unavailable Dates
        </h2>

        {

          bookedDates.map((booking) => (

            <div
              key={booking._id}
            >

              <p>

                {booking.checkIn
                  .split('T')[0]}

                {' '}to{' '}

                {booking.checkOut
                  .split('T')[0]}

              </p>

            </div>

          ))

        }

      </div>

      {/* FAVORITE BUTTON */}
      <button

        className="favorite-btn"

        onClick={handleFavorite}

      >

        ❤️ Add To Favorites

      </button>

      {/* REVIEW FORM */}
      <div className="review-form">

        <h2>
          Add Review
        </h2>

        {/* RATING */}
        <select

          value={rating}

          onChange={(event) =>

            setRating(
              Number(
                event.target.value
              )
            )

          }

        >

          <option value="1">
            1 Star
          </option>

          <option value="2">
            2 Stars
          </option>

          <option value="3">
            3 Stars
          </option>

          <option value="4">
            4 Stars
          </option>

          <option value="5">
            5 Stars
          </option>

        </select>

        {/* COMMENT */}
        <textarea

          placeholder="Write Review"

          value={comment}

          onChange={(event) =>

            setComment(
              event.target.value
            )

          }

        />

        <button onClick={handleReview}>

          Submit Review

        </button>

      </div>

      {/* REVIEWS SECTION */}
      <div className="reviews-section">

        <h2>
          Reviews
        </h2>

        {

          reviews.map((review) => (

            <div

              className="review-card"

              key={review._id}

            >

              <h3>

                {review.user.name}

              </h3>

              <p>

                ⭐ {review.rating}

              </p>

              <p>

                {review.comment}

              </p>

            </div>

          ))

        }

      </div>

      {/* HOST ONLY BUTTONS */}
      {

        property.host?.toString()
        === userId && (

          <>

            {/* EDIT BUTTON */}
            <Link
              to={`/edit-property/${property._id}`}
            >

              <button className="edit-btn">

                Edit Property

              </button>

            </Link>

            {/* DELETE BUTTON */}
            <button

              className="delete-btn"

              onClick={handleDelete}

            >

              Delete Property

            </button>

          </>

        )

      }

    </div>

  );
}

export default PropertyDetails;