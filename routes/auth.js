const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const { register, login, getProfile } = require('../controllers/authController');
const  protect = require('../middleware/authMiddleware');

// Existing routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login.html?error=google_failed` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const userData = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      token
    };
    res.redirect(`${process.env.FRONTEND_URL}/login.html?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
  }
);

module.exports = router;