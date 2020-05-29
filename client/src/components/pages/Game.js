import React, { useState, useContext, useEffect } from 'react';
import Button from '../game/Button';
import List from '../game/List';

import GameContext from '../../context/game/gameContext';
import AuthContext from '../../context/auth/authContext';
import { LOAD_GAME } from '../../context/types';

const Game = () => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;

  const {
    covidhealth,
    userhealth,
    actions,
    game,
    comm,
    loadGame
  } = gameContext;

  // useEffect(() => {
  //   loadGame(user);
  // });

  return (
    <div>
      <div className='grid-2 bg-light text-center x-large'>
        <div>
          <div className='card bg-success medium'>
            <h1>Player</h1>
            <h3> Health:{userhealth}</h3>
          </div>
        </div>
        <div>
          <div className='card bg-danger medium '>
            <h1>COVID</h1>
            <h3> Health:{covidhealth}</h3>
          </div>
        </div>
      </div>
      <div style={actionsStyle}>
        {actions.map(action => (
          <Button key={action.id} action={action} />
        ))}
      </div>
      <div className='grid-2 bg-light m-1'>
        <List comm={comm}></List>
      </div>
    </div>
  );
};

const actionsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1.5rem'
};

export default Game;
