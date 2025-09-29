const User = require('../models/userModel2');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.userVerification = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
