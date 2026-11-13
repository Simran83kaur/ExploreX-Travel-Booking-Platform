const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
    },

    date: {
      type: String,
      required: true,
    },

    basePrice: {
      type: String,
    },

    totalPrice: {
      type: String,
    },

    hotel: {
      type: String,
    },

    hotelDetails: {
      stars: String,
      room: String,
      meals: String,
    },

    flight: {
      type: String,
    },

    flightDetails: {
      from: String,
      to: String,
      class: String,
      time: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);