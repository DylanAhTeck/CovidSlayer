const express = require('express');
//const { register, login, getUser } = require('../controllers/auth');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/creategame', protect, creategame);
router.post('/attack', protect, attack);
router.post('/powerattack', protect, powerattack);
router.post('/healingpotion', protect, healingpotion);
router.post('/surrender', protect, surrender);
router.get('/health', protect, health);

module.exports = router;
