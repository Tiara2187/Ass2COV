const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const market = require('./market');
const barrack = require('./barrack');
const farm = require('./farm');
const errorHandler = require('../middlewares/errorHandler');

router.use('/users', userRoutes);
router.use(authentication); // with token
router.use('/markets', market);
router.use('/barracks', barrack);
router.use('/farms', farm);
router.use(errorHandler);

module.exports = router;