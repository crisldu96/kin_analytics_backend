const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.home);
router.get('/region/:regionid', ctrlMain.getRegion);

router.get('/info', ctrlMain.info);
router.get('/contacto', ctrlMain.contacto);
router
  .route('/region/:regionid/new')
  .get(ctrlMain.getAgregarParque)
  .post(ctrlMain.agregarParque);

module.exports = router;
