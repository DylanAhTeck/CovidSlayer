const express = require('express');
const {
  creategame,
  attack,
  powerattack,
  healingpotion
} = require('../controllers/game');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/creategame', protect, creategame);
router.put('/attack', protect, attack);
router.put('/powerattack', protect, powerattack);
router.post('/healingpotion', protect, healingpotion);
router.post('/surrender', protect, surrender);

module.exports = router;
