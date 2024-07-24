const router = require('express').Router();

const itemController = require('../controllers/itemController.js');
const userController = require('../controllers/userController.js');
const pageController = require('../controllers/pageController.js');
const db = require("../database");


router.get ('/', pageController.home);
router.get ('/login', pageController.login);
router.get ('/logout', userController.logout);
router.get ('/register', pageController.register);
router.get ('/logout', userController.logout);
//router.post ('/api/login', userController.authenticate);
router.post ('/api/register', userController.create);


router.get ('/item/', itemController.index);
router.post ('/item/', itemController.post);
router.put ('/item/', itemController.put);
router.delete ('/item/', itemController.delete);

module.exports = router;