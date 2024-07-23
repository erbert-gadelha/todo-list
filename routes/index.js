const router = require('express').Router();

const itemController = require('../controllers/itemController.js');
const pageController = require('../controllers/pageController.js');
const db = require("../database");


router.get ('/', pageController.home);

router.get ('/item/', itemController.index);
router.post ('/item/', itemController.post);
router.put ('/item/', itemController.put);
router.delete ('/item/', itemController.delete);

module.exports = router;