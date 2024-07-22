const router = require('express').Router();

const itemController = require('../controllers/itemController.js');


router.get ('/item/', itemController.index);
router.post ('/item/', itemController.post);
router.put ('/item/', itemController.put);
router.delete ('/item/', itemController.delete);

module.exports = router;