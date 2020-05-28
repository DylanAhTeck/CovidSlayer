//
import React, { useContext, useState } from 'react';
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
    game
  } = gameContext;

  const { user } = authContext;

  const doAction = () => {
    switch (action.id) {
      case 0:
        return attack(game);
      case 1:
        return powerattack(game);
      case 2:
        return healingpotion(game);
      case 3:
        return surrender(game);
    }
  };

  return (
    <button className='btn-dark btn-large btn-block' onClick={doAction}>
      {action.action}
    </button>
  );
};
export default Button;
