const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.home);
router.get('/region', ctrlMain.region);

router.get('/info', ctrlMain.info);
router.get('/contacto', ctrlMain.contacto);

module.exports = router;
