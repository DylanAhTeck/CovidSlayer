import React, { useContext } from 'react';
import GameContext from '../../context/game/gameContext';
import AuthContext from '../../context/auth/authContext';

const Button = ({ action }) => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);
  const {
    attack,
    powerattack,
    healingpotion,
    surrender,
    game,
    loadGame
  } = gameContext;

  const { user } = authContext;

  const doAction = async () => {
    switch (action.id) {
      case 0:
        await attack(game);
        return loadGame(user);
      case 1:
        await powerattack(game);
        return loadGame(user);
      case 2:
        await healingpotion(game);
        return loadGame(user);
      case 3:
        await surrender(game);
        return loadGame(user);
      default:
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
