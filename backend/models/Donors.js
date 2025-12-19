const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    lastDonationDate: {
      type: Date,
      required: true, // fixed
    },
    comments: {
      type: String,
    },
    nationality: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
