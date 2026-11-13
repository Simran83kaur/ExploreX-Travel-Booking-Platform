import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import HotelBooking from "./pages/HotelBooking";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import DestinationDetails from "./pages/DestinationDetails";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import FlightBooking from "./pages/FlightBooking";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
return ( <Routes>
<Route path="/" element={<Layout />}>

```
    {/* Public Pages - Users can explore without login */}
    <Route index element={<Home />} />
    <Route path="destinations" element={<Destinations />} />
    <Route path="destination-details" element={<DestinationDetails />} />
    <Route path="flights" element={<Flights />} />
    <Route path="hotels" element={<Hotels />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="search-results" element={<SearchResults />} />

    {/* Authentication */}
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />

    {/* User Profile */}
    <Route path="profile" element={<Profile />} />

    {/* Booking Pages
        Authentication should be checked inside these pages
        before allowing the user to complete a booking.
    */}
    <Route path="booking" element={<Booking />} />
    <Route path="flight-booking" element={<FlightBooking />} />
    <Route path="hotel-booking" element={<HotelBooking />} />

    {/* User's Bookings */}
    <Route path="my-bookings" element={<MyBookings />} />

  </Route>

  {/* 404 Page */}
  <Route path="*" element={<NotFound />} />
</Routes>

);
}

export default App;
