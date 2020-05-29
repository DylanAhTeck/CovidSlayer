const Game = require('../models/Game');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const chalk = require('chalk');
// @desc    Create Game
// @route   POST /api/v1/game/creategame
// @access  Private

// Need to send the user id in the body of request
exports.creategame = asyncHandler(async (req, res, next) => {
  try {
    // Create user

    const user = req.body.user;
    const avatar = req.body.user.avatar;

    const newGame = new Game({ user: user._id });
    const game = await newGame.save();

    user.current_game = game._id;

    const updated_user = await User.findByIdAndUpdate(
      user._id,
      { $set: user },
      { new: true }
    );

    const log = req.log;
    const comm = `New game was created by ${req.body.user.avatar}`;

    console.log(chalk.yellow.underline(comm + '. Logging to begin:'));

    res.status(200).json({ game: game, user: updated_user, comm: comm });
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

    if (game.userhealth <= 0 || game.covidhealth <= 0) {
      GameEnd(game, res);
    } else {
      res.status(200).json({ game, comm });
    }
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

    log.info(comm);

    if (game.userhealth <= 0 || game.covidhealth <= 0) {
      GameEnd(game, res);
    } else {
      res.status(200).json({ game, comm });
    }
  } catch (err) {
    next(err);
  }
});

// @desc    Healing potion - heal between 0-10, also damaged between 0-10
// @route   PUT /api/v1/game/healingpotion
// @access  Private

exports.healingpotion = asyncHandler(async (req, res, next) => {
  try {
    let game = await Game.findById(req.body.game._id);
    if (!game) return res.status(404).json({ msg: 'not authorized' });

    const health_increase = Math.floor(Math.random() * 11);
    const health_damage = Math.floor(Math.random() * 11);

    game.userhealth = Math.max(
      game.userhealth - health_damage + health_increase,
      0
    );

    const log = req.log;
    const comm = `(HEALING POTION) Player receives ${health_increase} health and ${health_damage} damage`;

    log.info(comm);

    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    if (game.userhealth <= 0) {
      GameEnd(game, res);
    } else {
      res.status(200).json({ game, comm });
    }
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
    const comm = `You surrendered! Game over.`;

    game = await Game.findByIdAndUpdate(
      req.body.game._id,
      { $set: game },
      { new: true }
    );

    log.info(comm);

    res.status(200).json({ game, comm });
  } catch (err) {
    next(err);
  }
});

const GameEnd = (game, res) => {
  if (game.userhealth <= 0 && game.covidhealth > 0)
    res.status(200).json({ game, comm: 'Covid wins!' });
  else if (game.userhealth > 0 && game.covidhealth <= 0)
    res.status(200).json({ game, comm: 'Player wins!' });
  else if (game.userhealth <= 0 && game.covidhealth <= 0)
    res.status(200).json({ game, comm: 'Both lose!' });
};

// @desc    Get current game
// @route   GET /api/v1/game/getgame
// @access  Private

exports.getgame = asyncHandler(async (req, res, next) => {
  try {
    const avatar = req.avatar;

    const user = await User.findOne({ avatar }).select();

    const current_game = await Game.findById(user.current_game);

    res.status(200).json({ game: current_game });
  } catch (err) {
    next(err);
  }
});
