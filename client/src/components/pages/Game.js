import React, { useContext, useEffect } from 'react';
import Button from '../game/Button';
import List from '../game/List';

import GameContext from '../../context/game/gameContext';
import AuthContext from '../../context/auth/authContext';

const Game = props => {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);

  const { user } = authContext;

  const {
    covidhealth,
    userhealth,
    actions,
    game,
    commentary,
    clearGame
  } = gameContext;

  useEffect(() => {
    if (game && (game.covidhealth === 0 || game.userhealth === 0)) {
      //Recheck
      clearGame();

      if (commentary.length) alert(commentary[0]);
      if (commentary.length) props.history.push('/');
    }
  });

  return (
    <div>
      <div className='grid-2 bg-light text-center x-large'>
        <div>
          <div className='card bg-success medium'>
            <h1>{user.avatar.length <= 6 ? user.avatar : 'Player'}</h1>
            <h3> Health:{game ? game.userhealth : userhealth}</h3>
          </div>
        </div>
        <div>
          <div className='card bg-danger medium '>
            <h1>COVID</h1>
            <h3> Health:{game ? game.covidhealth : covidhealth}</h3>
          </div>
        </div>
      </div>
      <div style={actionsStyle}>
        {actions.map(action => (
          <Button key={action.id} action={action} />
        ))}
      </div>
      <div className='grid-2 bg-light m-1'>
        <List commentary={commentary}></List>
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
