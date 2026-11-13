const Booking = require("../models/Booking");

const createBooking = async (req, res) => {

  try {

    const booking = await Booking.create(req.body);

    res.status(201).json({

      message: "Booking Successful",

      booking

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

const getBookings = async (req, res) => {

  const bookings = await Booking.find();

  res.json(bookings);

};

module.exports = {

  createBooking,

  getBookings

};