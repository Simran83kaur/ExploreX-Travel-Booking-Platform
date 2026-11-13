import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import destinationData from "../data/destinations";
import "./DestinationsPage.css";

function Destinations({ featured = false }) {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchDestination =
    searchParams.get("search")?.toLowerCase() || "";

  const [countryFilter, setCountryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Default");


  const countries = [
    "All",
    ...new Set(
      destinationData.map((place) => place.country)
    ),
  ];


  const dataToShow = featured
    ? destinationData.filter(
        (place) => place.featured
      )
    : destinationData;

  let filteredPlaces = dataToShow.filter((place) => {

    const matchesSearch =
      searchDestination === "" ||
      (place.name || "")
        .toLowerCase()
        .includes(searchDestination) ||
      (place.country || "")
        .toLowerCase()
        .includes(searchDestination);

    const matchesCountry =
      countryFilter === "All" ||
      place.country === countryFilter;

    const price = Number(
      String(place.price || place.startingPrice || "")
        .replace(/[₹,]/g, "")
    );

    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "50000" && price <= 50000) ||
      (
        priceFilter === "100000" &&
        price > 50000 &&
        price <= 100000
      ) ||
      (
        priceFilter === "200000" &&
        price > 100000
      );

    return (
      matchesSearch &&
      matchesCountry &&
      matchesPrice
    );
  });

  if (sortBy === "LowPrice") {

    filteredPlaces.sort((a, b) => {

      const priceA = Number(
        String(a.price || a.startingPrice || "")
          .replace(/[₹,]/g, "")
      );

      const priceB = Number(
        String(b.price || b.startingPrice || "")
          .replace(/[₹,]/g, "")
      );

      return priceA - priceB;
    });
  }

  if (sortBy === "HighPrice") {

    filteredPlaces.sort((a, b) => {

      const priceA = Number(
        String(a.price || a.startingPrice || "")
          .replace(/[₹,]/g, "")
      );

      const priceB = Number(
        String(b.price || b.startingPrice || "")
          .replace(/[₹,]/g, "")
      );

      return priceB - priceA;
    });
  }

  if (sortBy === "Rating") {

    filteredPlaces.sort(
      (a, b) =>
        Number(b.rating) - Number(a.rating)
    );
  }

  const clearFilters = () => {

    setCountryFilter("All");
    setPriceFilter("All");
    setSortBy("Default");

  };


  return (

    <section className="destinations">

      {/* HEADING */}

      {!featured && (

        <>
          <h2>Explore Destinations</h2>

          <p>
            Find your dream destination and plan
            your next unforgettable journey.
          </p>
        </>

      )}

      {/* FEATURED HEADING */}

      {featured && (

        <>
          <h2>Featured Destinations</h2>

          <p>
            Explore some of our most popular destinations.
          </p>
        </>

      )}

      {/* FILTER BAR */}

      {!featured && (

        <div className="filter-bar">

          {/* <input
            className="search-display"
            type="text"
            value={searchDestination}
            placeholder="Search destination..."
            readOnly
          /> */}

          {/* COUNTRY */}

          <select
            value={countryFilter}
            onChange={(e) =>
              setCountryFilter(e.target.value)
            }
          >

            {countries.map((country) => (

              <option
                key={country}
                value={country}
              >
                {country}
              </option>

            ))}

          </select>

          {/* SORT */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="Default">
              Sort By
            </option>

            <option value="LowPrice">
              Price: Low → High
            </option>

            <option value="HighPrice">
              Price: High → Low
            </option>

            <option value="Rating">
              Highest Rated
            </option>

          </select>

          {/* PRICE */}

          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
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

          {/* CLEAR */}

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      )}

      {/* DESTINATION CARDS */}

      <div className="destination-grid">

        {filteredPlaces.length > 0 ? (

          filteredPlaces.map((place, index) => (

            <div
              className="card"
              key={place._id || place.id || `${place.name}-${index}`}
            >

              {/* IMAGE */}

              <div className="image-box">

                <img
                  src={place.image}
                  alt={place.name}
                />

                {/* FAVORITE */}

                {/* <button
                  className="favorite"
                  type="button"
                  aria-label={`Add ${place.name} to favorites`}
                >
                  <FaHeart />
                </button> */}

                {/* RATING */}

                <div className="rating">
                  ⭐ {place.rating}
                </div>

              </div>

              {/* CONTENT */}

              <div className="card-content">

                <h3>
                  {place.name}
                </h3>

                {/* COUNTRY */}

                <p className="country">

                  <FaMapMarkerAlt />

                  {place.country}

                </p>

                {/* INFORMATION */}

                <div className="info">

                  <span className="days">
                    🕒 {place.duration}
                  </span>

                  <span className="best-time">
                    ☀ {place.bestTime}
                  </span>

                </div>

                {/* FOOTER */}

                <div className="card-footer">

                  <span className="price">

                    {place.price ||
                      `₹${Number(
                        place.startingPrice || 0
                      ).toLocaleString("en-IN")}`}

                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/destination-details",
                        {
                          state: place,
                        }
                      )
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <h2 className="no-destination">
            No destination found.
          </h2>

        )}

      </div>

    </section>

  );
}

export default Destinations;