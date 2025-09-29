// const { signup, signin, signout } = require('../controllers/auth2Controller');
const { signup, login, logout } = require('../controllers/authController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/', userVerification);
module.exports = router;
