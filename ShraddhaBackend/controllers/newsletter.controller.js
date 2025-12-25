const Newsletter = require("../models/Newsletter");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    await Newsletter.create({ email });

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
