const router = require('express').Router();
const FarmController = require('../controllers/FarmController');
// authorization module
const farmAuthorization = require('../middlewares/farmAuthorization');

router.post('/:userID', FarmController.post);
router.get('/', FarmController.list);
router.get('/:id/detail', FarmController.detail);
router.get('/:id/foodGenerate', FarmController.foodGenerate);
router.get('/:id/collectFood', FarmController.collectFood);


router.put('/:id', farmAuthorization, FarmController.put);
router.delete('/:id',farmAuthorization, FarmController.delete );

module.exports = router;
