//
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/game/gameContext';

const Button = ({ action: action }) => {
  const gameContext = useContext(GameContext);
  const {
    createGame,
    attack,
    powerattack,
    healingpotion,
    surrender
  } = gameContext;

  const doAction = () => {
    switch (action.id) {
      case 0:
        return attack();
      case 1:
        return powerattack();
      case 2:
        return healingpotion();
      case 3:
        return surrender();
    }
  };

  return (
    <button className='btn-dark btn-large btn-block' onClick={doAction}>
      {action.action}
    </button>
  );
};
export default Button;
