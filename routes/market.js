const router = require('express').Router();
const MarketController = require('../controllers/MarketController');
// authorization module
const marketAuthorization = require('../middlewares/marketAuthorization');

router.post('/:userID', MarketController.post);
router.get('/', MarketController.list);
router.get('/:id/detail', MarketController.detail);
router.get('/:id/goldGenerate', MarketController.goldGenerate);
router.get('/:id/collectGold', MarketController.collectGold);
// router
router.put('/:id', marketAuthorization, MarketController.put);
router.delete('/:id', marketAuthorization, MarketController.delete );

module.exports = router;
