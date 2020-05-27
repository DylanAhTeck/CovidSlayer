const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  covidhealth: {
    type: Number,
    default: 100,
    required: true
  },
  userhealth: {
    type: Number,
    default: 100,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);
