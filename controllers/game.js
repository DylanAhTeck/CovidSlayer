const Game = require('../models/Game');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create Game
// @route   POST /api/v1/game/creategame
// @access  Private

// Need to send the user id in the body of request
exports.creategame = asyncHandler(async (req, res, next) => {
  try {
    // Create user
    const newGame = new Game({ user: req.body.user.id });
    const game = await newGame.save();

    res.status(200).json({ game: game, msg: 'Game created' });
  } catch (err) {
    next(err);
  }
});

// @desc    Attack - inflict between 0-10 damage
// @route   PUT /api/v1/game/attack
// @access  Private

exports.attack = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game.id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    // Make sure user owns contact
    // Possibly change L34 to req.user.id?

    if (game.user.toString() !== req.body.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const covid_damage = Math.floor(Math.random() * 11);
    const user_damage = Math.floor(Math.random() * 11);

    game.userhealth = game.userhealth - covid_damage;
    game.covidhealth = game.covidhealth - user_damage;

    game = await Game.findByIdAndUpdate(
      req.body.game.id,
      { $set: game },
      { new: true }
    );

    res.status(200).json({ game, msg: 'Attack action successful' });
  } catch (err) {
    next(err);
  }
});

// @desc    Power attack - inflict between 10-30 damange
// @route   PUT /api/v1/game/powerattack
// @access  Private

exports.powerattack = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game.id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    // Make sure user owns contact
    // Possibly change L34 to req.user.id?
    if (game.user.toString() !== req.body.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const covid_damage = Math.floor(Math.random() * 21) + 10;
    const user_damage = Math.floor(Math.random() * 21) + 10;

    game.userhealth = game.userhealth - covid_damage;
    game.covidhealth = game.covidhealth - user_damage;

    game = await Game.findByIdAndUpdate(
      req.body.game.id,
      { $set: game },
      { new: true }
    );

    res.status(200).json({ game, msg: 'Attack action successful' });
  } catch (err) {
    next(err);
  }
});

// @desc    Healing potion - heal a random amount up to full health
// @route   PUT /api/v1/game/healingpotion
// @access  Private

exports.healingpotion = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game.id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    // Make sure user owns contact
    // Possibly change L34 to req.user.id?
    if (game.user.toString() !== req.body.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const health_increase = Math.floor(Math.random() * (100 - game.userhealth));
    const user_damage = Math.floor(
      Math.random() * (game.userhealth + health_increase)
    );

    game.userhealth = game.userhealth - user_damage + health_increase;

    game = await Game.findByIdAndUpdate(
      req.body.game.id,
      { $set: game },
      { new: true }
    );

    res.status(200).json({ game, msg: 'Attack action successful' });
  } catch (err) {
    next(err);
  }
});
