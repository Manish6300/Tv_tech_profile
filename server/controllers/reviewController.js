const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    if (!name || !rating || !message)
      return res.status(400).json({ message: 'All fields are required' });
    const review = await Review.create({ name, rating: Number(rating), message });
    res.status(201).json({ success: true, data: review, message: 'Review submitted for approval!' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ success: true, data: review });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
