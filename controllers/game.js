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

    const newGame = new Game({ user: req.body.user._id });
    const game = await newGame.save();

    const log = req.log;
    const comm = `New game was created by ${req.body.user.avatar}`;

    console.log(comm);

    res.status(200).json({ game: game, comm: comm });
  } catch (err) {
    next(err);
  }
});

// @desc    Attack - inflict between 0-10 damage
// @route   PUT /api/v1/game/attack
// @access  Private

exports.attack = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game._id);
    //let game = await Game.findById('5ece3e501eab4f0ebf1c3c03');

    if (!game) return res.status(404).json({ msg: 'not authorized' });

    const covid_damage = Math.floor(Math.random() * 11);
    const user_damage = Math.floor(Math.random() * 11);

    game.userhealth = Math.max(game.userhealth - covid_damage, 0);
    game.covidhealth = Math.max(game.covidhealth - user_damage, 0);

    const log = req.log;
    const comm = `(ATTACK) Player deals ${user_damage} damage, receives ${covid_damage} damage`;
    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    log.info(comm);

    GameEndTest(game, res);

    res.status(200).json({ game, comm });
  } catch (err) {
    next(err);
  }
});

// @desc    Power attack - inflict between 10-30 damange
// @route   PUT /api/v1/game/powerattack
// @access  Private

exports.powerattack = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game._id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    const covid_damage = Math.floor(Math.random() * 21) + 10;
    const user_damage = Math.floor(Math.random() * 21) + 10;

    game.userhealth = Math.max(game.userhealth - covid_damage, 0);
    game.covidhealth = Math.max(game.covidhealth - user_damage, 0);

    const log = req.log;
    const comm = `(POWER ATTACK) Player deals ${user_damage} damage, receives ${covid_damage} damage`;

    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    GameEndTest(game, res);

    res.status(200).json({ game, comm });
  } catch (err) {
    next(err);
  }
});

// @desc    Healing potion - heal a random amount up to full health
// @route   PUT /api/v1/game/healingpotion
// @access  Private

exports.healingpotion = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game._id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    const health_increase = Math.floor(Math.random() * (100 - game.userhealth));
    const user_damage = Math.floor(
      Math.random() * (game.userhealth + health_increase)
    );

    game.userhealth = Math.max(
      game.userhealth - user_damage + health_increase,
      0
    );

    const log = req.log;
    const comm = `(HEALING POTION) Player receives ${health_increase} health and ${covid_damage} damage`;

    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    GameEndTest(game, res);

    res.status(200).json({ game, comm });
  } catch (err) {
    next(err);
  }
});

// @desc    Surrender
// @route   POST /api/v1/game/surrender
// @access  Private

exports.surrender = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game._id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    game.userhealth = 0;

    const log = req.log;
    const comm = `GAME OVER. The player surrenders.`;

    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    res.status(200).json({ game, comm });
  } catch (err) {
    next(err);
  }
});

const GameEndTest = (game, res) => {
  if (game.userhealth <= 0 && game.covidhealth > 0)
    res.status(200).json({ game, end: true, winner: 'covid' });
  else if (game.userhealth > 0 && game.covidhealth <= 0)
    res.status(200).json({ game, end: true, winner: 'user' });
  else if (game.userhealth <= 0 && game.covidhealth <= 0)
    res.status(200).json({ game, end: true, winner: 'none' });
};
