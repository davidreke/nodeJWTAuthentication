// set up router
const { Router } = require('express');

// import the authController
const authController = require('../controllers/authControllers')

// create a new instance of the router by creating a variable that equals the invoking of the router.
const router = Router();


router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);
// we will create an auth controller file that will keep our logic seperate from our routes. We will name the folder controllers, and the file authControllers.js



module.exports = router;


