const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  covidhealth: {
    type: int,
    default: 100,
    required: true
  },
  playerhealth: {
    type: int,
    default: 100,
    required: true
  }
});

module.exports = mongoose.model('Game', GameSchema);
