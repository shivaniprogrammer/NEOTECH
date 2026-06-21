
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');




// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login.html?error=google_failed`,
    session: false
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login.html?error=google_failed`);
    }
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
