const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlSub = require('../controllers/subdocumento');

/* GET home page. */
router.get('/region', ctrlMain.listaRegiones);
router.post('/region', ctrlMain.crearRegion);

router.get('/region/:regionid', ctrlMain.getUnaRegion);
router.put('/region/:regionid', ctrlMain.updateRegion);
router.delete('/region/:regionid', ctrlMain.borraRegion);
router.post('/region/:regionid', ctrlSub.crearParque);

router.get('/region/:regionid/parque/:parqueid', ctrlSub.getParque);
router.put('/region/:regionid/parque/:parqueid', ctrlSub.updateParque);
router.delete('/region/:regionid/parque/:parqueid', ctrlSub.borraParque);

// router.post('/region/:region/parque', ctrlMain.creaParqueRegion);
// router.delete('/region/:region/parque/:parque', ctrlMain.borraParqueRegion);
// router.put('/region/:region/parque/:parque', ctrlMain.updateParqueRegion);

module.exports = router;
