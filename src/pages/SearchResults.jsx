import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

import bali from "../assets/bali/bali.jpg";
import switzerland from "../assets/switzerland/switzerland.jpg";
import dubai from "../assets/dubai/dubai.jpg";
import maldives from "../assets/maldives/maldives.jpg";

function SearchResults() {

  const navigate = useNavigate();
  const location = useLocation();

  const search = location.state;

  const places = [

    {
      image: bali,
      name: "Bali",
      country: "Indonesia",
      price: "₹59,999",
      days: "5 Days",
      rating: "4.8"
    },

    {
      image: switzerland,
      name: "Switzerland",
      country: "Europe",
      price: "₹1,29,999",
      days: "7 Days",
      rating: "4.9"
    },

    {
      image: dubai,
      name: "Dubai",
      country: "UAE",
      price: "₹79,999",
      days: "4 Days",
      rating: "4.7"
    },

    {
      image: maldives,
      name: "Maldives",
      country: "Indian Ocean",
      price: "₹99,999",
      days: "6 Days",
      rating: "5.0"
    }

  ];

  const results = places.filter((place) =>
    place.name.toLowerCase().includes(search.destination.toLowerCase())
  );

  return (

    <div className="search-results">

      <h1>Search Results</h1>

      <p>

        Destination :
        <strong> {search.destination}</strong>

      </p>

      <p>

        {search.checkIn}
        {" "}
        to
        {" "}
        {search.checkOut}

      </p>

      <p>

        {search.travelers} Travelers

      </p>

      <div className="results-grid">

        {results.length > 0 ? (

          results.map((place, index) => (

            <div
              className="result-card"
              key={index}
            >

              <img
                src={place.image}
                alt={place.name}
              />

              <h2>{place.name}</h2>

              <p>{place.country}</p>

              <p>{place.days}</p>

              <h3>{place.price}</h3>

              <button
                onClick={() =>
                  navigate("/destination-details", {
                    state: place,
                  })
                }
              >
                View Details
              </button>

            </div>

          ))

        ) : (

          <h2>No destination found.</h2>

        )}

      </div>

    </div>

  );

}

export default SearchResults;