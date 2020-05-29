import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import GameContext from '../../context/game/gameContext';

const Home = props => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;
  const { createGame } = gameContext;

  useEffect(() => {
    if (!user) loadUser();
    //props.history.push('/game');
  }, [loadUser]);

  const startGame = () => {
    createGame(user);
    props.history.push('/game');
  };

  return (
    <div className='card bg-light large'>
      <div>
        <h1 className='text-center'>
          Welcome to <span className='text-primary'>COVID Slayer!</span>
        </h1>
      </div>
      <div className='text-center'>
        <button type='button' className='btn btn-primary' onClick={startGame}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default Home;
