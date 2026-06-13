const ServiceRequest = require('../models/ServiceRequest');

// GET /api/requests  (admin only)
exports.getRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/requests  (public)
exports.addRequest = async (req, res) => {
  try {
    const {
      customerName, phone, address, tvBrand,
      tvModel, problemDescription, latitude, longitude, mapLink
    } = req.body;

    if (!customerName || !phone || !address || !tvBrand || !problemDescription)
      return res.status(400).json({ message: 'Please fill all required fields' });

    // Build Google Maps link from coords if not supplied
    const resolvedMapLink = mapLink ||
      (latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : '');

    const request = await ServiceRequest.create({
      customerName, phone, address, tvBrand,
      tvModel: tvModel || '',
      problemDescription,
      latitude:  latitude  ? parseFloat(latitude)  : null,
      longitude: longitude ? parseFloat(longitude) : null,
      mapLink: resolvedMapLink
    });

    res.status(201).json({
      success: true,
      data: request,
      message: 'Service request submitted successfully!'
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/requests/:id  (admin only)
exports.updateStatus = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/requests/:id  (admin only)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    await request.deleteOne();
    res.json({ success: true, message: 'Request deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
