// const mongoose = require("mongoose");
// const requestSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   requestType: {
//     type: String,
//     required: true,
//   },
//   bloodType: {
//     type: String,
//     required: true,
//   },
// });
// const request = mongoose.model("requests", requestSchema);
// module.exports = request;
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  requestType: {
    type: String,
    required: true,
  },

  bloodType: {
    type: String,
    required: true,
  },

  // ⭐ NEW FIELD: STATUS
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
});

const request = mongoose.model("requests", requestSchema);

module.exports = request;
