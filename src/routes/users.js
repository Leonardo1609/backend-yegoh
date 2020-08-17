const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.createUser );
router.get('/', userController.getUsers );
router.post('/modify/:id', userController.modifyUser );
module.exports = router;