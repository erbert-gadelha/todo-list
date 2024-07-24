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
router.post ('/api/register', userController.create);


router.post ('/api/todo', itemController.create);
router.put ('/api/todo', itemController.edit);
router.delete ('/api/todo', itemController.delete);


router.get ('/set_as_done/:id', itemController.done);

module.exports = router;