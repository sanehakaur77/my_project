const Suggestions = require("../models/Suggestions");
const PostSuggestions = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newSuggestion = new Suggestions({
      name,
      email,
      subject,
      message,
    });
    await newSuggestion.save();
    res.json({
      message: "your suggestion has been saved successfully",
      success: true,
    });
  } catch (err) {
    res.json({ message: "error", success: false });
  }
};
const getSuggestions = async (req, res) => {
  try {
    const suggesstions = await Suggestions.find();
    if (!suggesstions) {
      return res.json({
        message: "there is no suggestions yet!",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "suggestions are found!",
        suggesstion: suggesstions,
        success: true,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "internal server error!", error: err });
  }
};
module.exports = {
  PostSuggestions,
  getSuggestions,
};
