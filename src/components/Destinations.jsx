import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import "./Destinations.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import destinationData from "../data/destinations";

function Destinations({ featured = false }) {
  console.log("Destinations component rendered");
  console.log(destinationData);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchDestination =
    searchParams.get("search")?.toLowerCase() || "";

  const [countryFilter, setCountryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const countries = [
    "All",
    ...new Set(destinationData.map(place => place.country))
  ];

  const dataToShow = featured
    ? destinationData.filter(place => place.featured)
    : destinationData;

  let filteredPlaces = dataToShow.filter((place) => {
    
    const matchesSearch =
      searchDestination === "" ||
      (place.name || "").toLowerCase().includes(searchDestination) ||
      (place.country || "").toLowerCase().includes(searchDestination);

    const matchesCountry =
      countryFilter === "All" ||
      place.country === countryFilter;

    const matchesDuration =
      durationFilter === "All" ||
      place.duration === durationFilter;

    const matchesRating =
      ratingFilter === "All" ||
      Number(place.rating) >= Number(ratingFilter);

    const price = Number(
      place.price.replace(/[₹,]/g, "")
    );

    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "50000" && price <= 50000) ||
      (priceFilter === "100000" &&
        price > 50000 &&
        price <= 100000) ||
      (priceFilter === "200000" &&
        price > 100000);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesDuration &&
      matchesRating &&
      matchesPrice
    );

  });
  if (sortBy === "LowPrice") {

    filteredPlaces.sort(
      (a, b) =>
        Number(a.price.replace(/[₹,]/g, "")) -
        Number(b.price.replace(/[₹,]/g, ""))
    );

  }

  if (sortBy === "HighPrice") {

    filteredPlaces.sort(
      (a, b) =>
        Number(b.price.replace(/[₹,]/g, "")) -
        Number(a.price.replace(/[₹,]/g, ""))
    );

  }

  if (sortBy === "Rating") {

    filteredPlaces.sort(
      (a, b) =>
        Number(b.rating) -
        Number(a.rating)
    );

  }

  return (

    <section className="destinations">

      <h2>Explore Destinations</h2>

      <p>
        Find your dream destination.
      </p>

      {!featured && (

        <div className="filter-bar">

          <input
            className="search-display"
            type="text"
            value={searchDestination}
            placeholder="Search destination..."
            readOnly
          />

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            {countries.map((country, index) => (

              <option
                key={index}
                value={country}
              >
                {country}
              </option>

            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >

            <option value="Default">
              Sort by Price
            </option>

            <option value="LowPrice">
              Low → High
            </option>

            <option value="HighPrice">
              High → Low
            </option>

            <option value="Rating">
              Highest Rated
            </option>

          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >

            <option value="All">
              All Budgets
            </option>

            <option value="50000">
              Under ₹50,000
            </option>

            <option value="100000">
              ₹50,000 - ₹1,00,000
            </option>

            <option value="200000">
              Above ₹1,00,000
            </option>

          </select>

          <button
            className="clear-filter"
            onClick={() => {

              setCountryFilter("All");
              setPriceFilter("All");
              setDurationFilter("All");
              setRatingFilter("All");
              setSortBy("Default");

            }}
          >

            Clear Filters

          </button>

        </div>

      )}

      <div className="destination-grid">

        {filteredPlaces.length > 0 ? (

          filteredPlaces.map((place, index) => (

            <div
              className="card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >

              <div className="image-box">

                <img
                  src={place.image}
                  alt={place.name}
                />

                {/* <button className="favorite">
                  <FaHeart />
                </button> */}

                <div className="rating">
                  ⭐ {place.rating}
                </div>

              </div>

              <div className="card-content">

                <h3>{place.name}</h3>

                <p className="country">
                  <FaMapMarkerAlt />
                  {place.country}
                </p>

                <div className="info">

                  <span className="days">
                    🕒 {place.duration}
                  </span>

                  <span className="best-time">
                    ☀ {place.bestTime}
                  </span>

                </div>

                <div className="card-footer">

                  <span className="price">
                    {place.price}
                  </span>

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

              </div>

            </div>

          ))

        ) : (

          <h2
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              marginTop: "50px",
            }}
          >
            No destination found.
          </h2>

        )}
      </div>

    </section>

  );

}

export default Destinations;