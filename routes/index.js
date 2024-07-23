const router = require('express').Router();

const itemController = require('../controllers/itemController.js');
const userController = require('../controllers/userController.js');
const pageController = require('../controllers/pageController.js');
const db = require("../database");


router.get ('/', pageController.home);

router.get ('/register', userController.index);
router.get ('/register', userController.register);
//router.post ('/login', userController.login);
router.post ('/register', userController['create-user']);


router.get ('/item/', itemController.index);
router.post ('/item/', itemController.post);
router.put ('/item/', itemController.put);
router.delete ('/item/', itemController.delete);

module.exports = router;