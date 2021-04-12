const router = require('express').Router();
const BarrackController = require('../controllers/BarrackController');

// authorization module
const barrackAuthorization = require('../middlewares/barrackAuthorization');

router.post('/:userID', BarrackController.post);
router.get('/', BarrackController.list);
router.get('/:id/detail', BarrackController.detail);
router.get('/:id/soliderGenerate',  BarrackController.soliderGenerate);
router.get('/:id/collectSolider', BarrackController.collectSolider);

router.put('/:id', barrackAuthorization, BarrackController.put);
router.delete('/:id', barrackAuthorization, BarrackController.delete );

module.exports = router;
