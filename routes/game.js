const express = require('express');
const {
  creategame,
  attack,
  powerattack,
  healingpotion,
  surrender
} = require('../controllers/game');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/creategame', protect, creategame);
router.post('/attack', protect, attack);
router.post('/powerattack', protect, powerattack);
router.post('/healingpotion', protect, healingpotion);
router.post('/surrender', protect, surrender);

module.exports = router;
