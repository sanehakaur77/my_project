const request = require("../models/Request");

const Request = async (req, res) => {
  try {
    const { name, email, phone, city, requestType, bloodType } = req.body;

    const isRequest = await request.findOne({ email });

    if (isRequest) {
      return res.status(400).json({
        message: "Request already exists!",
        success: false,
      });
    }

    // Create new request
    const newRequest = new request({
      name,
      email,
      phone,
      city,
      requestType,
      bloodType,
    });

    await newRequest.save();

    return res.status(201).json({
      message: "Request upload success",
      success: true,
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = Request;
