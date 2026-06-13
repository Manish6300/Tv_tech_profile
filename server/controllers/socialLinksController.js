const SocialLinks = require('../models/SocialLinks');

exports.getLinks = async (req, res) => {
  try {
    let links = await SocialLinks.findOne();
    if (!links) links = await SocialLinks.create({});
    res.json({ success: true, data: links });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateLinks = async (req, res) => {
  try {
    let links = await SocialLinks.findOne();
    if (!links) links = new SocialLinks();
    Object.assign(links, req.body);
    await links.save();
    res.json({ success: true, data: links });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
