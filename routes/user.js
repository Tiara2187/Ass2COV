const router = require('express').Router();
const userController = require('../controllers/UserController');
// authorization module
const userAuthorization = require('../middlewares/userAuthorization');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:userID', userAuthorization, userController.getOneUser);
router.put('/:userID', userAuthorization, userController.updateUser);
router.post('/:userID/attack/:rivalID', userController.attackPlayer);

module.exports = router;
