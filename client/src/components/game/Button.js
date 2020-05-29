//
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/game/gameContext';
import AuthContext from '../../context/auth/authContext';

const Button = ({ action: action }) => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);
  const {
    createGame,
    attack,
    powerattack,
    healingpotion,
    surrender,
    game,
    loadGame
  } = gameContext;

  // useEffect(() => {
  //   loadGame();
  // }, [game, loadGame]);

  const { user } = authContext;

  const doAction = () => {
    switch (action.id) {
      case 0:
        attack(game);
        return loadGame(user);
      case 1:
        powerattack(game);
        return loadGame(user);
      case 2:
        healingpotion(game);
        return loadGame(user);
      case 3:
        surrender(game);
        return loadGame(user);
    }
  };

  return (
    <button className='btn-dark btn-large btn-block' onClick={doAction}>
      {action.action}
    </button>
  );
};
export default Button;
