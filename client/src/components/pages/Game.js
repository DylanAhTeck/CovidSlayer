import React, { useState, useContext, useEffect } from 'react';
import Button from '../game/Button';

import GameContext from '../../context/game/gameContext';
import AuthContext from '../../context/auth/authContext';

const Game = () => {
  const gameContext = useContext(GameContext);

  const { covidhealth, userhealth, actions } = gameContext;

  //const authContext = useContext(AuthContext);

  //console.log(authContext);

  console.log(actions);
  return (
    <div style={actionsStyle}>
      {actions.map(action => (
        <Button key={action.id} action={action} />
      ))}
    </div>
  );
};

const actionsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1.5rem'
};

export default Game;
